import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('event')
@ApiTags('事件')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/create')
  @ApiOperation({ summary: '创建事件' })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get('/findAll')
  @ApiOperation({ summary: '查询所有事件' })
  findAll() {
    return this.eventService.findAll();
  }

  @Get('/findOne')
  @ApiOperation({ summary: '查询单条事件' })
  findOne(@Query('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Post('/update')
  @ApiOperation({ summary: '更新事件' })
  update(@Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(updateEventDto.id, updateEventDto);
  }

  @Post('/remove')
  @ApiOperation({ summary: '删除事件' })
  remove(@Query('id') id: string) {
    return this.eventService.remove(+id);
  }
}
