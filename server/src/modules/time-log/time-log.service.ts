import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateTimeLogDto } from './dto/create-time-log.dto';
import { UpdateTimeLogDto } from './dto/update-time-log.dto';
import { TimeLog } from './entities/time-log.entity';
import { DeleteFlagEnum } from '@/enums/common.enum';

const EXPOSE_FIELDS = [
  'id',
  'start',
  'end',
  'userId',
  'catagoryId',
  'description',
];

@Injectable()
export class TimeLogService {
  constructor(
    @Inject('TIME_LOG_REPOSITORY')
    private timeLogRepository: typeof TimeLog,
  ) {}

  async create(createTimeLogDto: CreateTimeLogDto): Promise<TimeLog> {
    const timeLog = new TimeLog(createTimeLogDto);
    return timeLog.save();
  }

  async find(): Promise<TimeLog[]> {
    return this.timeLogRepository.findAll<TimeLog>({
      where: { deleteFlag: DeleteFlagEnum.EXIST },
      attributes: EXPOSE_FIELDS,
    });
  }

  async findOne(id: number): Promise<TimeLog> {
    return this.timeLogRepository.findOne<TimeLog>({
      where: {
        id,
        deleteFlag: DeleteFlagEnum.EXIST,
      },
      attributes: EXPOSE_FIELDS,
    });
  }

  async update(id: number, updateTimeLogDto: UpdateTimeLogDto): Promise<void> {
    const existTimeLog = this.findOne(id);
    if (!existTimeLog) {
      throw new HttpException(
        `id为${id}的时间记录不存在`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    this.timeLogRepository.update(updateTimeLogDto, { where: { id } });
  }

  async remove(id: number) {
    const existTimeLog = this.findOne(id);
    if (!existTimeLog) {
      throw new HttpException(
        `id为${id}的时间记录不存在`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.timeLogRepository.update(
      {
        deleteFlag: DeleteFlagEnum.DELETED,
      },
      { where: { id } },
    );
  }
}
