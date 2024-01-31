import { lazy } from 'react'
import lazyLoad from '@/utils/lazyLoad'
import { IRouteObject } from '@/routers/interface'
import { LayoutIndex } from '@/routers/constant'

export const core: IRouteObject[] = [
  {
    element: <LayoutIndex />,
    path: '/core',
    children: [
      {
        path: 'day-view',
        element: lazyLoad(lazy(() => import('@/pages/dayView/index'))),
        meta: {
          title: '计划',
        },
      },
    ],
  },
]

export default core
