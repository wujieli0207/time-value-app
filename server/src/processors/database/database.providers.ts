import { Catagory } from '@/modules/catagory/entities/catagory.entity';
import { Event } from '@/modules/event/entities/event.entity';
import { TimeLog } from '@/modules/time-log/entities/time-log.entity';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
      });
      sequelize.addModels([Catagory, Event, TimeLog]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
