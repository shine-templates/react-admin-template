import { lazy } from 'react'

export const RouteConfig: Array<RouteCellObj> = [
  {
    name: '首页',
    path: '/Dashboard',
    component: lazy(() => import('../views/dashboard/index')),
    role: '首页',
    icon: 'shouye',
  },
  {
    name: '关于',
    path: '/about',
    component: lazy(() => import('../views/about/index')),
    role: '首页',
    icon: 'shouye',
  },
  {
    name: '404',
    path: '/404',
    component: lazy(() => import('@/components/NoMatch')),
    hidden: true,
  },
]
