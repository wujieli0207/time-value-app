import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { DeleteFlagEnum } from '@/enums/common.enum';

const EXPOSE_FIELDS = [
  'id',
  'title',
  'start',
  'end',
  'userId',
  'catagoryId',
  'description',
];

@Injectable()
export class EventService {
  constructor(
    @Inject('EVENT_REPOSITORY')
    private eventRepository: typeof Event,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const event = new Event(createEventDto);
    return event.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepository.findAll<Event>({
      where: { deleteFlag: DeleteFlagEnum.EXIST },
      attributes: EXPOSE_FIELDS,
    });
  }

  async findOne(id: number) {
    return this.eventRepository.findOne<Event>({
      where: {
        id,
        deleteFlag: DeleteFlagEnum.EXIST,
      },
      attributes: EXPOSE_FIELDS,
    });
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<void> {
    const existEvent = this.findOne(id);
    if (!existEvent) {
      throw new HttpException(`id为${id}的事件不存在`, HttpStatus.UNAUTHORIZED);
    }

    console.log('updateEventDto: ', updateEventDto);
    this.eventRepository.update(updateEventDto, { where: { id } });
  }

  async remove(id: number) {
    const existEvent = this.findOne(id);
    if (!existEvent) {
      throw new HttpException(`id为${id}的事件不存在`, HttpStatus.UNAUTHORIZED);
    }

    await this.eventRepository.update(
      {
        deleteFlag: DeleteFlagEnum.DELETED,
      },
      { where: { id } },
    );
  }
}
