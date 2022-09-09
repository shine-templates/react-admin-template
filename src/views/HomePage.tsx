import React, { FC, Fragment } from 'react'
import MyLayOut from '@/layOut/LayOut'
import { Route, Switch, Redirect } from 'react-router-dom'
import conf from '@/assets/conf'
import NoMatch from '@/components/NoMatch/index'
import Login from './login'

const HomePage: FC = () => {
  const getAuth = () => sessionStorage.getItem(conf.SESSION_KEY + 'Authorization')
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route
        path="/"
        render={() => {
          return getAuth() ? <MyLayOut /> : <Redirect to="/login" />
        }}
      />
      <Route component={NoMatch}></Route>
    </Switch>
  )
}

export default HomePage
