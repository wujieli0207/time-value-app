import { Event } from './entities/event.entity';

export const EventProviders = [
  {
    provide: 'EVENT_REPOSITORY',
    useValue: Event,
  },
];
