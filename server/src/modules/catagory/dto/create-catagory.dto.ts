import { ApiProperty } from '@nestjs/swagger';
import { Catagory } from '../entities/catagory.entity';

export class CreateCatagoryDto extends Catagory {
  @ApiProperty({ description: '分类名称' })
  title: string;

  @ApiProperty({ description: '分类颜色' })
  color: string;

  @ApiProperty({ description: '分类颜色' })
  icon: string;
}
