// 请求响应参数（不包含 data）
export interface IResult {
  status: number
  message: string
}

// 请求响应参数（包含 data）
export interface IResultData<T = unknown> extends IResult {
  data?: T
}
