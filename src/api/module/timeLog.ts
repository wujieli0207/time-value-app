import http from '@/api'
import { ITimeInterface } from '#/time'

export interface ICreateTimeLogParams extends Omit<ITimeInterface, 'id'> {}

export interface IUpdateTimeLogParams extends Partial<ITimeInterface> {
  id: number
}

interface IRemoveTimeLogParams extends Pick<ITimeInterface, 'id'> {}

export function createTimeLogApi(params: ICreateTimeLogParams) {
  return http.post<ITimeInterface>('/time-log/create', params)
}

export function updateTimeLogApi(params: IUpdateTimeLogParams) {
  return http.post<ITimeInterface>('/time-log/update', params)
}

export function getTimeLogApi() {
  return http.get<ITimeInterface[]>('/time-log/find')
}

export function removeTimeLogApi(params: IRemoveTimeLogParams) {
  return http.post<ITimeInterface>(`/time-log/remove?id=${params.id}`)
}
