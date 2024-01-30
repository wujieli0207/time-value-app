import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger, setupValidator } from './app.config';
import { FormatResponseInterceptor } from './shared/interceptor/http.response.interceptor';
import { HttpExceptionFilter } from './shared/filter/http-exception.filter';
import { LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  const logger = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  app.setGlobalPrefix('api'); // 全局路由前缀

  setupSwagger(app); // 设置Swagger文档
  setupValidator(app); // 启用

  // 拦截器设置
  app.useGlobalInterceptors(new FormatResponseInterceptor());

  // 过滤器设置
  app.useGlobalFilters(new HttpExceptionFilter());

  // 跨域设置，启用 CORS
  app.enableCors({
    origin: ['http://127.0.0.1', 'http://localhost'],
    credentials: true,
  });

  await app.listen(3000);

  // print running environment
  // logger.log(
  //   `Application[${APPLICATION_NAME}]-Env[${environment}]`,
  //   'Bootstrap',
  // );
  // print server info
  logger.log(
    `The service is running, please visit it: [ ${await app.getUrl()} ]`,
    'Bootstrap',
  );
}
bootstrap();
