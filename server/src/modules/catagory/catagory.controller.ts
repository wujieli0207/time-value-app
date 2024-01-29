import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CatagoryService } from './catagory.service';
import { CreateCatagoryDto } from './dto/create-catagory.dto';
import { UpdateCatagoryDto } from './dto/update-catagory.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('catagory')
@ApiTags('分类')
export class CatagoryController {
  constructor(private readonly catagoryService: CatagoryService) {}

  @Post('/create')
  @ApiOperation({ summary: '创建分类' })
  create(@Body() createCatagoryDto: CreateCatagoryDto) {
    return this.catagoryService.create(createCatagoryDto);
  }

  @Get('/findAll')
  @ApiOperation({ summary: '查询所有分类' })
  findAll() {
    return this.catagoryService.findAll();
  }

  @Get('/findOne')
  @ApiOperation({ summary: '查询单条分类' })
  findOne(@Query('id') id: string) {
    return this.catagoryService.findOne(+id);
  }

  @Post('/update')
  @ApiOperation({ summary: '更新分类' })
  update(@Body() updateCatagoryDto: UpdateCatagoryDto) {
    return this.catagoryService.update(updateCatagoryDto.id, updateCatagoryDto);
  }

  @Post('/remove')
  @ApiOperation({ summary: '删除分类' })
  remove(@Query('id') id: string) {
    return this.catagoryService.remove(+id);
  }
}
