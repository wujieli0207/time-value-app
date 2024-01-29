import { Module } from '@nestjs/common';
import { TimeLogService } from './time-log.service';
import { TimeLogController } from './time-log.controller';
import { TimeLogProviders } from './time-log.providers';

@Module({
  controllers: [TimeLogController],
  providers: [TimeLogService, ...TimeLogProviders],
})
export class TimeLogModule {}
