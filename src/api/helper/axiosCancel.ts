import axios, { AxiosRequestConfig, Canceler } from 'axios'
import { isFunction } from 'lodash-es'
import { stringify } from 'qs'

const pendingMap = new Map<string, Canceler>()

export const getPendingUrl = (config: AxiosRequestConfig) =>
  [
    config.method,
    config.url,
    stringify(config.data),
    stringify(config.params),
  ].join('&')

export class AxiosCanceler {
  addPending(config: AxiosRequestConfig): void {
    // ! 在请求开始前，对之前的请求做检查取消操作
    this.removePending(config)

    const url = getPendingUrl(config)
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // 如果 pending 中不存在当前请求，添加进去
          pendingMap.set(url, cancel)
        }
      })
  }

  removePending(config: AxiosRequestConfig): void {
    const url = getPendingUrl(config)

    if (pendingMap.has(url)) {
      // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
      const cancel = pendingMap.get(url)
      cancel && cancel()
      pendingMap.delete(url)
    }
  }

  removeAllPending(): void {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel()
    })
    pendingMap.clear()
  }

  reset(): void {
    pendingMap.clear()
  }
}
