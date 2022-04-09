import axios, { AxiosRequestConfig } from 'axios'
import { message } from 'antd'
import omit from 'lodash/omit'
import getHeaders from './distinguishHeader'
import NProgress from 'nprogress'
import conf from '../conf'
import 'nprogress/nprogress.css'

interface RequestConfig extends AxiosRequestConfig {
  prefix?: string
}

NProgress.configure({
  showSpinner: false, // 关闭loading动画
  trickle: false, // 关闭进度条步进
  minimum: 0.1, // 最小百分比
  ease: 'ease', // 过度动画
  speed: 500, // 速度（毫秒）
  trickleRate: 0.02, // 每次步进增长多少
  trickleSpeed: 800, // 步进间隔
})

const request = (config: RequestConfig = {}) => {
  const { url } = config
  const omitConfig = omit(config, ['url'])

  const _baseURL = omitConfig.prefix || ''

  const _config: AxiosRequestConfig = {
    url: _baseURL + url,
    timeout: 5000,
    method: 'get',
    headers: {
      ...getHeaders(),
    },
    ...omitConfig,
  }

  NProgress.start()

  const promise = axios(_config).then(result => {
    NProgress.done()
    const body = result.data
    switch (body.code) {
      case '00000':
        return Promise.resolve(body)
      case '11111':
      case '22222':
      case '33333':
      // case 'sys_login_no_privilege':
      //   message.error(body.msg)
      //   sessionStorage.clear()
      //   setTimeout(() => {
      //     window.location.href = `${conf.basename}/login`
      //   }, 3000)
      //   return Promise.reject(body)
      // case 'sys_login_none':
      //   message.error(body.msg)
      //   sessionStorage.clear()
      //   setTimeout(() => {
      //     window.location.href = `${conf.basename}/login`
      //   }, 3000)
      //   return Promise.reject(body)
      case '99999':
        message.error('操作失败')
        return Promise.reject(body)

      default:
        return Promise.reject(body)
    }
  })
  return promise
}

export default request
