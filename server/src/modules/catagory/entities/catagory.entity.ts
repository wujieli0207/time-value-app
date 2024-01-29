import { Table, Column } from 'sequelize-typescript';
import { CommonModel } from '@/common/common.model';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 't_catagory' })
export class Catagory extends CommonModel {
  @Column({ comment: '分类名称' })
  @ApiProperty({ description: '分类名称' })
  title: string;

  @Column({ comment: '分类颜色' })
  @ApiProperty({ description: '分类颜色' })
  color: string;

  @ApiProperty({ description: '分类颜色' })
  @Column({ comment: '分类颜色' })
  icon: string;
}
