import { Provider } from '@nestjs/common';
import { createClient } from 'redis';

export const RedisProviders: Provider[] = [
  {
    provide: 'REDIS_CLIENT',
    useFactory: async () => {
      const client = createClient({
        socket: {
          host: 'localhost',
          port: 6379,
        },
        database: 1,
      });
      await client.connect();
      return client;
    },
  },
];
