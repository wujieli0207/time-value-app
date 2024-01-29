import { StatusEnum } from '@/enums/time'

export interface ItimeInterface {
  startDateTime: Date
  endDateTime: Date
  catagoryId: strng
  status: StatusEnum
  description: string
}
