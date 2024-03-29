import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { EventProviders } from './event.providers';

@Module({
  controllers: [EventController],
  providers: [EventService, ...EventProviders],
})
export class EventModule {}
