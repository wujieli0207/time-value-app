import { CommonModel } from '@/common/common.model';
import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table } from 'sequelize-typescript';

@Table({ tableName: 't_event' })
export class Event extends CommonModel {
  @Column({
    type: DataType.CHAR('200'),
    comment: '事件名称',
  })
  @ApiProperty({ description: '事件名称' })
  title: string;

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

  @Column({ type: DataType.TEXT, comment: '事件备注' })
  @ApiProperty({ description: '事件备注' })
  description: string;

  @Column({ type: DataType.CHAR(50), comment: '用户id' })
  @ApiProperty({ description: '用户id' })
  userId: string;

  @Column({ type: DataType.INTEGER, comment: '分类id' })
  @ApiProperty({ description: '分类id' })
  catagoryId: number;
}
