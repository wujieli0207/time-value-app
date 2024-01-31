import { IRouteObject } from '../interface'
import { basicRoutes } from '../routes'

/**
 * @description 递归查询对应的路由
 */
export function searchRoute(
  path: string,
  parentPath: string = '',
  routes: IRouteObject[] = basicRoutes
): IRouteObject {
  let result: IRouteObject = {}

  for (const item of routes) {
    // 兼容嵌套的情况
    // console.log('teset', `${parentPath}${item.path}`, path)
    if (item.path === path || `${parentPath}/${item.path}` === path) return item

    if (item.children) {
      const res = searchRoute(path, item.path, item.children)
      if (Object.keys(res).length) result = res
    }
  }
  return result
}
