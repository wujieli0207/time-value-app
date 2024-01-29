import { LoggerConfigService } from '@/config/logger.config.service';
import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useClass: LoggerConfigService,
    }),
  ],
})
export class SharedModule {}
