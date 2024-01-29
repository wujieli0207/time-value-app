import { StatusEnum } from '@/enums/time'

export const catagoryConfig = [
  {
    value: 'work',
    label: '工作',
    color: 'red',
  },
  {
    value: 'improve',
    label: '自我提升',
    color: 'blue',
  },
  {
    value: 'live',
    label: '生活',
    color: 'green',
  },
  {
    value: 'boring',
    label: '无聊',
    color: 'gray',
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
