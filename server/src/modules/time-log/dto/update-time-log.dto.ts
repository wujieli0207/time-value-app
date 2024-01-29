import { PartialType } from '@nestjs/mapped-types';
import { CreateTimeLogDto } from './create-time-log.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTimeLogDto extends PartialType(CreateTimeLogDto) {
  @ApiProperty({ description: 'id' })
  id: number;
}
