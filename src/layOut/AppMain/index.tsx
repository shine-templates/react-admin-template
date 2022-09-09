import React, { Suspense, FC } from 'react'
import { Spin } from 'antd'
import { Route, Switch, Redirect } from 'react-router-dom'
import { RouteConfig } from '@/route'
import _ from 'lodash'
import NoMatch from '@/components/NoMatch'

const routeFlat = (arr: RouteCellObj[]): RouteCellObj[] => {
  const result: RouteCellObj[] = []
  ;(function flat(arr: RouteCellObj[]) {
    arr.forEach(item => {
      if (item.children && item.children.length > 0) {
        flat(item.children)
      } else {
        result.push(item)
      }
    })
  })(arr)
  return result
}

const renderRoute = (routeList: RouteCellObj[]) => {
  let arr: JSX.Element[] = []
  const itera = (routeList: RouteCellObj[]) => {
    routeList.forEach(item => {
      if (!_.isEmpty(item.children)) {
        itera(item.children as any)
      } else {
        arr.push(<Route exact key={item.path} path={item.path} component={item.component} />)
      }
    })
  }
  itera(routeList)
  return arr
}

const rendereDirect = (routeList: RouteCellObj[]) => {
  const newList = routeList.filter(v => v.redirect)
  let arr: JSX.Element[] = []
  const itera = (List: RouteCellObj[]) => {
    List.forEach(item => {
      if (item.redirect) {
        arr.push(<Redirect exact from={item.path} to={item.redirect} key={item.path} />)
      }
      item.children && itera(item.children)
    })
  }
  itera(newList)
  return arr
}

const AppMain: FC = () => {
  return (
    <Suspense fallback={<Spin delay={400} />}>
      <Switch>
        <Redirect exact from="/" to="/Dashboard" />
        {rendereDirect(RouteConfig)}
        {renderRoute(RouteConfig)}
        {/* {routeFlat(RouteConfig).map(route => (
          <Route key={route.path} path={route.path} component={route.component} exact />
        ))} */}
        <Route component={NoMatch}></Route>
      </Switch>
    </Suspense>
  )
}

export default AppMain
