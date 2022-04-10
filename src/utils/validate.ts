const validatePhone = (phone: string, msg: string = '请输入正确的手机号') => {
  let pattern = new RegExp(
    /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
  )
  return pattern.test(phone)
}

const validateIdcart = (idcart: string, msg: string = '请输入正确的身份证号') => {
  let pattern = new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)
  return pattern.test(idcart)
}

const validateQQ = (qq: string, msg: string = '请输入正确的qq号') => {
  let pattern = new RegExp(/^[1-9][0-9]{4,12}$/)
  return pattern.test(qq)
}
const validateNumber = number => {
  let pattern = new RegExp(/^100|\d{1,2}$/)
  return pattern.test(number)
}
// 电话与手机号校验
const validateTelephone = (telephone: string) => {
  var tel = /^0\d{2,3}-?\d{7,8}$/
  var phone = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
  let businessPhone = /^400-[0-9]{3}-[0-9]{4}/
  // debugger
  if (telephone.length === 11) {
    //手机号码
    if (phone.test(telephone)) {
      return true
    }
  } else if (telephone.indexOf('-') !== -1) {
    //电话号码
    if (tel.test(telephone)) {
      return true
    }
    if (businessPhone.test(telephone)) {
      return true
    }
  }
}

const validateNum = async (rule, value) => {
  if (value) {
    if (value > 9999) throw new Error('不可超过9999')
  }
}

const validatePrice = async (rule, value) => {
  if (value) {
    if (value > 99999999) throw new Error('不可超过99999999')
  }
}

const clos = obj => {
  obj.target.value = obj.target.value.replace(/[^\d^\.]+/g, '')
}

const clos1 = obj => {
  obj.target.value = obj.target.value.replace(/\D/g, '')
}

// 0-100
export const validateINtRule = { pattern: /^([0-9]{1,2}|100)$/, message: '必须为0~100的正整数' }

// 价格带两位小数
export const validateMoney = {
  pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
  message: '必须为正整数，且最多保留两位小数',
}

export {
  validatePhone,
  validateIdcart,
  validateQQ,
  validateNumber,
  validateTelephone,
  validateNum,
  validatePrice,
  clos,
  clos1,
}
