import { Model, Column, DataType } from 'sequelize-typescript';
import { DeleteFlagEnum } from '@/enums/common.enum';

export abstract class CommonModel extends Model<CommonModel> {
  @Column({ primaryKey: true, autoIncrement: true, comment: 'id' })
  id: number;

  @Column({
    type: DataType.ENUM(...Object.values(DeleteFlagEnum)),
    comment: '删除标识, N-未删除，Y-已删除',
    defaultValue: DeleteFlagEnum.EXIST,
  })
  deleteFlag: DeleteFlagEnum;

  // ! createAt 和 updateAt 由 sequelize 框架自动创建
}
