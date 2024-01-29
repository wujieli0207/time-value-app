export enum DeleteFlagEnum {
  'EXIST' = 'N',
  'DELETED' = 'Y',
}

/**
 * @description：请求配置
 */
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = 500,
  OVERDUE = 599,
  TIMEOUT = 10000,
  TYPE = 'success',
}
