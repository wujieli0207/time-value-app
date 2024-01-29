import { StatusEnum } from '@/enums/time'

export interface ITimeInterface {
  id: number
  start: string
  end: string
  catagoryId: number
  status: StatusEnum
  description: string
}
