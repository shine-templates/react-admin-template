import axios, { AxiosRequestConfig } from 'axios'
import getHeaders from './distinguishHeader'
import conf from '../assets/conf'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

interface Options extends AxiosRequestConfig {
  prefix: string
}

NProgress.configure({
  showSpinner: false,
  trickle: false,
  minimum: 0.1,
  ease: 'ease',
  speed: 500,
  trickleRate: 0.02,
  trickleSpeed: 800,
})

export interface ResponseData<T = any> {
  /**
   * 状态码
   * @type { string }
   */
  code: string

  /**
   * 数据
   * @type { T }
   */
  data: T

  /**
   * 消息
   * @type { string }
   */
  msg: string
}

const notLogin = (data: ResponseData) => {
  Promise.reject(data)
  sessionStorage.clear()
  window.location.href = `${conf.basename}/login`
}

const instance = axios.create({
  timeout: 5000,
  method: 'get',
  validateStatus: status => {
    return status >= 200 && status < 300
  },
})

instance.interceptors.request.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(response => {
  NProgress.done()
  switch (response.data.code) {
    case '00000':
      return response.data
    case 'sys_login_none':
      return notLogin(response.data)
    default:
      return Promise.reject(response.data)
  }
})

const request = (requestConfig: Options) => {
  NProgress.start()
  const { url, prefix } = requestConfig
  const config = {
    headers: {
      ...getHeaders(),
    },
    ...requestConfig,
    url: prefix + url,
  }
  return instance(config)
}

export default request
