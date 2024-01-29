import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ description: '事件名称' })
  title: string;

  @ApiProperty({ description: '开始时间' })
  start: Date;

  @ApiProperty({ description: '结束时间' })
  end: Date;

  @ApiProperty({ description: '事件备注' })
  description: string;

  @ApiProperty({ description: '用户id' })
  userId: string;

  @ApiProperty({ description: '分类id' })
  catagoryId: number;
}
