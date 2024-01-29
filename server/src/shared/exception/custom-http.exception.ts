import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCodeEnum, ErrorMessage } from './error-code.enum';

export class CustomHttpException extends HttpException {
  constructor(code: ErrorCodeEnum) {
    super({ code, message: ErrorMessage[code] }, HttpStatus.BAD_REQUEST);
  }
}
