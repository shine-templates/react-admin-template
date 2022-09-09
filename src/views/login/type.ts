export type LOGIN = {
  account: string
  password: string
  remember?: boolean
}

export type userInfo = {
  account: string
  avatar: string
  idCardNo: string
  menuList: []
  name: string
  nickName: string
  phone: string
  sex: string
  token: string
  userId: string
  loginOrgList: Array<{ organizationId: string; organizationName: string }>
}
