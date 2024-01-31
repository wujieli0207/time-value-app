export interface IRouteObject {
  path?: string
  element?: React.ReactNode
  children?: IRouteObject[]
  meta?: IMetaProps
}

export interface IMetaProps {
  title: string
  requiresAuth?: boolean // false 表示不需要 token 认证，直接返回
}
