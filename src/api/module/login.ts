import {
  ILoginParams,
  ILoginResponse,
  ILogoutParams,
  IRegisterParams,
  ISendVerifyCodeParams,
} from '#/user'
import http from '@/api'
import { IResult } from '../interface/common'

export function loginApi(params: ILoginParams) {
  return http.post<ILoginResponse>('/authing/login', params)
}

export function registerApi(params: IRegisterParams) {
  return http.post<ILoginResponse>('/authing/register', params)
}

export function sendVerifyCodeApi(params: ISendVerifyCodeParams) {
  return http.post<IResult>('/authing/sendVerifyCode', params)
}

export function logoutApi(params: ILogoutParams) {
  return http.post<IResult>('/authing/logout', params)
}
