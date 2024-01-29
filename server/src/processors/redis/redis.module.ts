import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisProviders } from './redis.provider';

@Global()
@Module({
  providers: [RedisService, ...RedisProviders],
  exports: [RedisService],
})
export class RedisModule {}
