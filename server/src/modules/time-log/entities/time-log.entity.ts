import { CommonModel } from '@/common/common.model';
import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table } from 'sequelize-typescript';
import { StatusEnum } from '@/enums/time-log.enum';

@Table({ tableName: 't_time_log' })
export class TimeLog extends CommonModel {
  @Column({
    type: DataType.DATE,
    comment: '开始时间',
  })
  @ApiProperty({ description: '开始时间' })
  start: Date;

  @Column({
    type: DataType.DATE,
    comment: '结束时间',
  })
  @ApiProperty({ description: '结束时间' })
  end: Date;

  @Column({ type: DataType.INTEGER, comment: '分类id' })
  @ApiProperty({ description: '分类id' })
  catagoryId: number;

  @Column({ type: DataType.TEXT, comment: '描述' })
  @ApiProperty({ description: '描述' })
  description: string;

  @Column({
    type: DataType.ENUM(StatusEnum.GOOD, StatusEnum.MIDDLE, StatusEnum.BAD),
    comment: '状态',
  })
  @ApiProperty({ description: '状态' })
  status: StatusEnum;

  @Column({ type: DataType.CHAR(50), comment: '用户id' })
  @ApiProperty({ description: '用户id' })
  userId: string;
}
