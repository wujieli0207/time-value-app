import { Module } from '@nestjs/common';
import { AuthingService } from './authing.service';
import { AuthingController } from './authing.controller';

@Module({
  controllers: [AuthingController],
  providers: [AuthingService],
})
export class AuthingModule {}
