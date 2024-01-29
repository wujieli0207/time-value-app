import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CatagoryModule } from './modules/catagory/catagory.module';
import { SharedModule } from './shared/shared.module';
import { RedisModule } from './processors/redis/redis.module';
import { AuthingModule } from './modules/authing/authing.module';
import { EventModule } from './modules/event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局可用的配置
    }),
    SharedModule,
    RedisModule,
    CatagoryModule,
    AuthingModule,
    EventModule,
  ],
})
export class AppModule {}
