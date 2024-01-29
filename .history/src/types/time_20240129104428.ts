import { StatusEnum } from '@/enums/time'

export interface ItimeInterface {
  startDateTime: Date
  endDateTime: Date
  status: StatusEnum
  description: string
}
