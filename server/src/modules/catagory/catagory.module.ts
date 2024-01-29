import { Module } from '@nestjs/common';
import { CatagoryService } from './catagory.service';
import { CatagoryController } from './catagory.controller';
import { CatagoryProviders } from './catagory.providers';

@Module({
  controllers: [CatagoryController],
  providers: [CatagoryService, ...CatagoryProviders],
})
export class CatagoryModule {}
