import { StatusEnum } from '@/enums/time'

export interface ItimeInterface {
  startDateTime: Date
  endDateTime: Date
  catagoryId: string
  status: StatusEnum
  description: string
}
