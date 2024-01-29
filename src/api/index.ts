import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import { AxiosCanceler } from './helper/axiosCancel'
import {
  showFullScreenLoading,
  tryHideFullScreenLoading,
} from '@/config/serviceLoading'
import { ResultEnum } from '@/enums/common'
import { message } from 'antd'
import { checkStatus } from './helper/checkStatus'
import { IResultData } from './interface/common'

const axiosCanceler = new AxiosCanceler()

const config = {
  // 默认地址请求地址
  baseURL: import.meta.env.VITE_API_URL as string,
  // 设置超时时间（10s）
  timeout: 10000,
  // 跨域时候允许携带凭证
  withCredentials: true,
}

class RequestHttp {
  service: AxiosInstance

  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)

    /**
     * token校验(JWT) : 接受服务器返回的token,存储到redux/本地储存当中
     */
    this.service.interceptors.request.use(
      // @ts-ignore
      (config: AxiosRequestConfig) => {
        axiosCanceler.addPending(config)

        // 控制当前请求是否展示全局 loading
        config.headers!.noLoading || showFullScreenLoading()

        // const token = (store.getState() as IReduxState).global.token || ''
        const token = '123'
        return {
          ...config,
          headers: {
            ...config.headers,
            'x-access-token': token,
          },
        }
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, config } = response

        // 在请求结束后，移除本次请求(关闭loading)
        axiosCanceler.removePending(config)
        tryHideFullScreenLoading()

        // TODO 登陆失效

        // 错误信息拦截
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          message.error(data.message)
          return Promise.reject(data)
        }

        // 请求成功
        return data
      },
      async (error: AxiosError) => {
        const { response } = error
        tryHideFullScreenLoading()

        // 请求超时单独处理
        if (error.message.indexOf('timeout') !== -1) {
          message.error('请求超时，请稍后再试')
        }

        if (response) {
          checkStatus(response.status, (response.data as any)?.message)
        }

        // 服务器结果都没有返回(可能服务器错误可能客户端断网) 断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) {
          window.location.hash = '/500'
        }

        return Promise.reject(error)
      }
    )
  }

  // 请求方法封装
  get<T>(url: string, params?: object, _object = {}): Promise<IResultData<T>> {
    return this.service.get(url, { ...params, ..._object })
  }
  post<T>(url: string, params?: object, _object = {}): Promise<IResultData<T>> {
    return this.service.post(url, { ...params, ..._object })
  }
}

export default new RequestHttp(config)
