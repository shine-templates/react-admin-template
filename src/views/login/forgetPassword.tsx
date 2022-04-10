import { Button, Form, Input, message } from 'antd'
import * as React from 'react'
import { sendSmsVerify } from '@/assets/api/login'
const ForgetPassword = React.forwardRef((props, ref) => {
  const [passwordForm] = Form.useForm()

  // 发送验证码
  const sendVerificationCode = () => {
    const phone = passwordForm.getFieldValue('phone')
    if (phone) {
      const params = { phone, type: '5' }
      const nextTime = 60
      sendSmsVerify(params)
      setCountDownNum(nextTime)
      countDown(nextTime)
    } else {
      message.error('请输入手机号')
    }
  }
  const [countDownNum, setCountDownNum] = React.useState(0)
  // 倒计时
  const countDown = num => {
    setTimeout(() => {
      if (num > 0) {
        const number = num - 1
        setCountDownNum(number)
        countDown(number)
      }
      return
    }, 1000)
  }
  // 验证码元素
  const renderSendVerificationCode = () => {
    if (countDownNum > 0) {
      return <span>{countDownNum}秒后重新发送</span>
    }
    return <Button onClick={() => sendVerificationCode()}> 发送验证码</Button>
  }
  React.useImperativeHandle(ref, () => ({
    form: passwordForm,
  }))
  // 忘记密码页面
  const renderForgetPassWordModal = () => {
    return (
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} form={passwordForm} autoComplete="off">
        <Form.Item label="账号" name="account" rules={[{ required: true, message: '请输入您的账号' }]}>
          <Input placeholder="请输入您的账号" />
        </Form.Item>

        <Form.Item
          label="手机号"
          name="phone"
          rules={[
            { required: true, message: '请输入手机号' },
            {
              validator(_, value) {
                const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
                if (regMobile.test(value)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('请输入正确的手机号码'))
              },
            },
          ]}
        >
          <Input placeholder="请输入手机号"></Input>
        </Form.Item>

        <Form.Item label="验证码" name="verifyCode" rules={[{ required: true, message: '请输入验证码' }]}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input placeholder="请输入验证码" />
            <div style={{ marginLeft: '15px', width: '160px' }}>{renderSendVerificationCode()}</div>
          </div>
        </Form.Item>

        <Form.Item
          label="新密码"
          name="password"
          rules={[
            { required: true, message: '请输入新密码' },
            {
              pattern: /^(?![0-9]+$)|(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
              message: '请输入6-16位字母和数字组合的密码',
            },
          ]}
        >
          <Input placeholder="请输入6-16位字母和数字组合的密码" />
        </Form.Item>
      </Form>
    )
  }

  return renderForgetPassWordModal()
})

export default ForgetPassword
