import { StatusEnum } from '@/enums/time'

export const catagoryConfig = [
  {
    value: 0,
    label: '未分类',
    color: 'gray',
  },
  {
    value: 1,
    label: '工作',
    color: 'red',
  },
  {
    value: 2,
    label: '自我提升',
    color: 'blue',
  },
  {
    value: 3,
    label: '生活',
    color: 'green',
  },
  {
    value: 4,
    label: '无聊',
    color: 'yellow',
  },
]

export const statusConfig = [
  {
    value: StatusEnum.GOOD,
    label: '还不错',
  },
  {
    value: StatusEnum.MIDDLE,
    label: '一般般',
  },
  {
    value: StatusEnum.BAD,
    label: '不太行',
  },
]
