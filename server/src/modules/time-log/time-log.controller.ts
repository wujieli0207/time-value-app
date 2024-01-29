import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { TimeLogService } from './time-log.service';
import { CreateTimeLogDto } from './dto/create-time-log.dto';
import { UpdateTimeLogDto } from './dto/update-time-log.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('time-log')
@ApiTags('时间记录')
export class TimeLogController {
  constructor(private readonly timeLogService: TimeLogService) {}

  @Post('/create')
  @ApiOperation({ summary: '创建时间记录' })
  create(@Body() createTimeLogDto: CreateTimeLogDto) {
    return this.timeLogService.create(createTimeLogDto);
  }

  @Get('/find')
  @ApiOperation({ summary: '查询时间记录' })
  findAll() {
    return this.timeLogService.find();
  }

  @Get('/findOne')
  @ApiOperation({ summary: '查询单条时间记录' })
  findOne(@Query('id') id: string) {
    return this.timeLogService.findOne(+id);
  }

  @Post('/update')
  @ApiOperation({ summary: '更新时间记录' })
  update(@Body() updateTimeLogDto: UpdateTimeLogDto) {
    return this.timeLogService.update(updateTimeLogDto.id, updateTimeLogDto);
  }

  @Post('/remove')
  @ApiOperation({ summary: '删除时间记录' })
  remove(@Query('id') id: string) {
    return this.timeLogService.remove(+id);
  }
}
