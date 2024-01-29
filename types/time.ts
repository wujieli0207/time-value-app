import { StatusEnum } from '@/enums/time'

export interface ITimeInterface {
  startDateTime: Date
  endDateTime: Date
  catagoryId: string
  status: StatusEnum
  description: string
}
