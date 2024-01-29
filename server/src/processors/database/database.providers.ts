import { Catagory } from '@/modules/catagory/entities/catagory.entity';
import { Event } from '@/modules/event/entities/event.entity';
import { TimeLog } from '@/modules/time-log/entities/time-log.entity';
import { Sequelize } from 'sequelize-typescript';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'time-value',
        // timezone: '+08:00', // 为 Sequelize 设置为北京时区
      });
      sequelize.addModels([Catagory, Event, TimeLog]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
