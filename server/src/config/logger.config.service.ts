import { Injectable } from '@nestjs/common';
import {
  WinstonModuleOptionsFactory,
  WinstonModuleOptions,
} from 'nest-winston';
import * as winston from 'winston';

@Injectable()
export class LoggerConfigService implements WinstonModuleOptionsFactory {
  createWinstonModuleOptions(): WinstonModuleOptions {
    return {
      // 定义日志格式
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
          (info) => `${info.timestamp} [${info.level}]: ${info.message}`,
        ),
      ),
      // 定义传输方式
      transports: [
        new winston.transports.Console({
          level: process.env.LOG_LEVEL || 'info', // 使用环境变量或默认的 'info' 级别
        }),
      ],
    };
  }
}
