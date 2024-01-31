import { IRouteObject } from '@/routers/interface'

const modules = import.meta.glob('./modules/*.tsx', { eager: true })
const routeModuleList: IRouteObject[] = []

Object.keys(modules).forEach((key) => {
  const mod = (modules[key] as any).default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

export const basicRoutes = [...routeModuleList]
