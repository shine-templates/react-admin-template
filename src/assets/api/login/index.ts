import request from '@/assets/utils/request'
const prefix = '/shy/yanglao'
type LoginType = {
  account: string
  password: string
}

// POST /back/core/login/login 用户登录接口
export function login<U>(data: LoginType): Promise<API.Res<U>> {
  return request({
    url: '/back/core/login/login',
    method: 'post',
    data,
    prefix,
  })
}

// /back/core/login/myOrg
export function myOrg<U>(): Promise<API.Res<U>> {
  return request({
    url: '/back/core/login/myOrg',
    method: 'get',
    prefix,
  })
}

// PUT /back/core/login/forgetPass 忘记密码
export function forgetPassword<U>(data: { systemId: number }): Promise<API.Res<U>> {
  return request({
    url: '/back/core/login/forgetPass',
    method: 'PUT',
    data,
    prefix,
  })
}

// POST /back/core/login/verifyCode 验证码
export function sendSmsVerify<U>(data): Promise<API.Res<U>> {
  return request({
    url: '/back/core/login/verifyCode',
    method: 'POST',
    data,
    prefix,
  })
}

// PUT /back/core/login/modifyPass 修改密码
export function modifyPass<U>(data): Promise<API.Res<U>> {
  return request({
    url: '/back/core/login/modifyPass',
    method: 'PUT',
    data,
    prefix,
  })
}

// GET /back/core/login/queryMenu
export function queryMenu<U>(): Promise<API.Res<U>> {
  return request({
    url: '/back/core/login/queryMenu',
    method: 'GET',
    prefix,
  })
}
