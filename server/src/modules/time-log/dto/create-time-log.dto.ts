import { StatusEnum } from '@/enums/time-log.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTimeLogDto {
  @ApiProperty({ description: '开始时间' })
  start: Date;

  @ApiProperty({ description: '结束时间' })
  end: Date;

  @ApiProperty({ description: '分类id' })
  catagoryId: number;

  @ApiProperty({ description: '描述' })
  description: string;

  @ApiProperty({ description: '状态' })
  status: StatusEnum;

  @ApiProperty({ description: '用户id' })
  userId: string;
}
