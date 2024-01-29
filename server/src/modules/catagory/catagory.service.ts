import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCatagoryDto } from './dto/create-catagory.dto';
import { UpdateCatagoryDto } from './dto/update-catagory.dto';
import { Catagory } from './entities/catagory.entity';
import { DeleteFlagEnum } from '@/enums/common.enum';

const EXPOSE_FIELDS = ['id', 'title', 'color', 'icon'];

@Injectable()
export class CatagoryService {
  constructor(
    @Inject('CATAGORY_REPOSITORY')
    private catagoryRepository: typeof Catagory,
  ) {}

  async create(createCatagoryDto: CreateCatagoryDto): Promise<Catagory> {
    const catagory = new Catagory(createCatagoryDto);
    return catagory.save();
  }

  async findAll(): Promise<Catagory[]> {
    return this.catagoryRepository.findAll<Catagory>({
      where: { deleteFlag: DeleteFlagEnum.EXIST },
      attributes: EXPOSE_FIELDS,
    });
  }

  async findOne(id: number): Promise<Catagory | null> {
    return this.catagoryRepository.findOne<Catagory>({
      where: {
        id: id,
        deleteFlag: DeleteFlagEnum.EXIST,
      },
      attributes: EXPOSE_FIELDS,
    });
  }

  async update(
    id: number,
    updateCatagoryDto: UpdateCatagoryDto,
  ): Promise<void> {
    const existCatagory = await this.findOne(id);
    if (!existCatagory) {
      throw new HttpException(`id为${id}的分类不存在`, HttpStatus.UNAUTHORIZED);
    }

    this.catagoryRepository.update(updateCatagoryDto, { where: { id } });
  }

  async remove(id: number): Promise<void> {
    const existCatagory = await this.findOne(id);
    if (!existCatagory) {
      throw new HttpException(`id为${id}的分类不存在`, HttpStatus.UNAUTHORIZED);
    }

    await existCatagory.update(
      {
        deleteFlag: DeleteFlagEnum.DELETED,
      },
      { where: { id } },
    );
  }
}
