import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CatagoryModule } from './modules/catagory/catagory.module';
import { SharedModule } from './shared/shared.module';
import { DatabaseModule } from './processors/database/database.module';
import { RedisModule } from './processors/redis/redis.module';
import { AuthingModule } from './modules/authing/authing.module';
import { EventModule } from './modules/event/event.module';
import { TimeLogModule } from './modules/time-log/time-log.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局可用的配置
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',
    }),
    SharedModule,
    DatabaseModule,
    RedisModule,
    CatagoryModule,
    AuthingModule,
    EventModule,
    TimeLogModule,
  ],
})
export class AppModule {}
