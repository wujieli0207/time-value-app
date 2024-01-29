import {
  BadRequestException,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 *
 * @description 设置 swagger 文档
 */
export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Time Value')
    .setDescription('api 接口')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // docs 为访问上下文
};

/**
 *
 * @description 校验规则配置
 */
export const setupValidator = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: false, // 一旦发现校验错误立即停止校验
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      exceptionFactory: (errors) => {
        const message = Object.values(errors[0].constraints)[0];
        return new BadRequestException({
          message,
          status: HttpStatus.BAD_REQUEST,
        });
      },
    }),
  );
};
