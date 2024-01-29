import { TimeLog } from './entities/time-log.entity';

export const TimeLogProviders = [
  {
    provide: 'TIME_LOG_REPOSITORY',
    useValue: TimeLog,
  },
];
