import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import { RouteConfig } from '@/route'
import React from 'react'
import { useLocation, withRouter } from 'react-router-dom'

const produceBreadcrumbItem = (path: string): string => {
  let activeBreadName: string = ''
  const itera = (routeList: RouteCellObj[]) => {
    for (let i = 0; i < routeList.length; i++) {
      if (routeList[i].path === path) {
        activeBreadName = routeList[i].name
      } else {
        if (routeList[i].hasOwnProperty('children')) {
          itera(routeList[i].children as any)
        }
      }
    }
  }
  itera(RouteConfig)
  return activeBreadName
}

const MyBreadcrumb = () => {
  const { pathname } = useLocation()
  const pathSnippets = pathname.split('/').filter(i => i)

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const path = `/${pathSnippets.slice(0, index + 1).join('/')}`
    if (path === '/Dashboard') {
      return []
    }
    return (
      <Breadcrumb.Item key={path}>
        <Link to={path}>{produceBreadcrumbItem(path)}</Link>
      </Breadcrumb.Item>
    )
  })

  return (
    <div style={{ display: 'inline-block', paddingLeft: '20px' }}>
      <Breadcrumb>
        {[
          <Breadcrumb.Item key="Dashboard">
            <Link to="/Dashboard">首页</Link>
          </Breadcrumb.Item>,
        ].concat(extraBreadcrumbItems as any)}
      </Breadcrumb>
    </div>
  )
}
export default withRouter(MyBreadcrumb)
