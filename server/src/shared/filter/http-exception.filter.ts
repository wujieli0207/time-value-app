import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

interface IAuthingResponse {
  message: string;
  code: number;
}

export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | IAuthingResponse, host: ArgumentsHost) {
    // 兼容对接 authing 的异常类型不是 HttpException
    const isHttpException = exception instanceof HttpException;

    const response = host.switchToHttp().getResponse();

    const exceptionStatus = isHttpException
      ? exception?.getStatus()
      : HttpStatus.BAD_REQUEST;

    // 设置错误信息
    const message =
      isHttpException || exception.message
        ? exception.message
        : `${
            exceptionStatus >= HttpStatus.INTERNAL_SERVER_ERROR
              ? 'Service Error'
              : 'Client Error'
          }`;
    const errrorResponse = {
      message,
      status: exceptionStatus,
      data: isHttpException
        ? JSON.stringify(exception.getResponse())
        : JSON.stringify(exception), // 自定义的错误代码
    };

    // 设置返回状态码，请求头，发送错误信息
    response.status(exceptionStatus);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errrorResponse);
  }
}
