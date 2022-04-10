import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './assets/styles/index.scss'
import { Provider } from 'react-redux'
import { store, persistor } from '@/store'
import { BrowserRouter as Router } from 'react-router-dom'
import HomePage from '@/views/HomePage'
import { ConfigProvider } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/lib/locale/zh_CN'
import { PersistGate } from 'redux-persist/integration/react'
import conf from '@/assets/conf'
import '@/icons'

ReactDOM.render(
  <ConfigProvider locale={locale}>
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <Router basename={conf.basename}>
        <HomePage />
      </Router>
      {/* </PersistGate> */}
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
)
