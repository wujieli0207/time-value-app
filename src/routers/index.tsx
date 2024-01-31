import { useRoutes, Navigate } from 'react-router-dom'
import { basicRoutes } from './routes'

const Router = () => {
  const routes = useRoutes([
    // {
    //   path: '/',
    //   element: <Navigate to={HOME_URL} />,
    // },
    ...basicRoutes,
    {
      path: '*',
      element: <Navigate to="/404" />,
    },
  ])
  return routes
}

export default Router
