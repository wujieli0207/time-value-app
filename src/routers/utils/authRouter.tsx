import { AxiosCanceler } from '@/api/helper/axiosCancel'
import { FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { searchRoute } from './index'
import { store } from '@/store'
import { HOME_URL, LOGIN_URL } from '@/config/globalConfig'

const axiosCanceler = new AxiosCanceler()

interface IProps {
  children: JSX.Element
}

const AuthRouter: FC<IProps> = ({ children }) => {
  // 在跳转路由之前，清除所有的请求
  axiosCanceler.removeAllPending()

  const { pathname } = useLocation()
  const route = searchRoute(pathname)

  const token = store.getState().global?.userInfo?.token

  // * 登陆页的状态判断，并且 token 存在直接进入主页
  if (pathname === LOGIN_URL && token) {
    return <Navigate to={HOME_URL} replace />
  }

  // * 判断当前路由是否需要访问权限(不需要权限直接放行)
  if (route.meta?.requiresAuth === false) {
    return children
  }

  // * 判断是否有Token
  if (!token) {
    return <Navigate to={LOGIN_URL} replace />
  }

  // TODO 如果访问的地址没有在路由表中重定向到403页面
  // if (Object.keys(route).length === 0) {
  //   return <Navigate to="/404" />
  // }

  return children
}

export default AuthRouter
