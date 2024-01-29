import { PartialType } from '@nestjs/mapped-types';
import { CreateCatagoryDto } from './create-catagory.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCatagoryDto extends PartialType(CreateCatagoryDto) {
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: '分类名称' })
  title: string;

  @ApiProperty({ description: '分类颜色' })
  color: string;

  @ApiProperty({ description: '分类颜色' })
  icon: string;
}
