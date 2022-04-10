import React, { useRef } from 'react'
import styles from './index.module.scss'
import { Form, Input, Button, message, Checkbox, Modal } from 'antd'
import { useHistory } from 'react-router-dom'
import { LOGIN, userInfo } from './type'
import { login, forgetPassword } from '@/assets/api/login'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { pick } from 'lodash'
import ForgetPassword from './forgetPassword'
import useModal from '@/components/hooks/useModal'
import conf from '@/assets/conf'
import './login.css'

const storage = (key: string, value: any) => {
  sessionStorage.setItem(conf.SESSION_KEY + key, value)
}

const rememberInfo = (obj: LOGIN) => {
  const newObj = pick(obj, ['account', 'password', 'remember'])
  for (const key in newObj) {
    localStorage.setItem(conf.SESSION_KEY + key, newObj[key])
  }
}

export default () => {
  const [form] = Form.useForm()
  const { replace } = useHistory()
  const forgetPassWordModal = useModal()
  const [loading, setLoading] = React.useState(false)
  const [loginLoading, setLoginLoading] = React.useState(false)
  const fpRef = useRef<any>()

  React.useEffect(() => {
    form.setFieldsValue({
      account: localStorage.getItem(conf.SESSION_KEY + 'account') || 'admin',
      password: localStorage.getItem(conf.SESSION_KEY + 'password') || 'admin',
      remember: JSON.parse(localStorage.getItem(conf.SESSION_KEY + 'remember') as string),
    })
  }, [form])

  const onFinish = (values: any) => {
    console.log('values: ', values)
    setLoginLoading(false)
    storage('Authorization', '233')
    replace('/Dashboard')
    // webLogin({ ...values, type: conf.loginType })
  }

  const webLogin = (bodyParams: LOGIN) => {
    setLoginLoading(true)
    login<userInfo>(bodyParams)
      .then(res => {
        const { remember } = bodyParams
        if (remember) {
          rememberInfo(bodyParams)
        } else {
          localStorage.clear()
        }
        storage('Authorization', res.data.token)
        storage('userName', res.data.name)
        setLoginLoading(false)
        replace('/Dashboard')
      })
      .catch(err => {
        setLoginLoading(false)
        message.error(err?.msg || '网络错误')
      })
  }

  const handleForgetPassWord = () => {
    forgetPassWordModal.setModalVisible(true)
  }

  const renderForgetPassWord = () => {
    return (
      <Modal
        width={500}
        destroyOnClose
        title="忘记密码"
        visible={forgetPassWordModal.modalvisible}
        onCancel={() => {
          forgetPassWordModal.setModalVisible(false)
        }}
        onOk={() => submitForgetPassWord()}
        confirmLoading={loading}
      >
        <ForgetPassword ref={fpRef}></ForgetPassword>
      </Modal>
    )
  }
  // 忘记密码提交
  const submitForgetPassWord = () => {
    fpRef.current.form.validateFields().then(values => {
      setLoading(true)
      forgetPassword(values)
        .then(() => {
          message.success('修改密码成功')
          forgetPassWordModal.setModalVisible(false)
        })
        .finally(() => {
          setLoading(false)
        })
    })
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.systemLogo}></div>
        <div className={styles.formContainer}>
          <div className={styles.formTitle}>
            <div className={styles.titleText}>{conf.title}</div>
          </div>
          <div>
            <Form
              name="normal_login"
              form={form}
              onFinish={onFinish}
              autoComplete="off"
              initialValues={{ account: 'admin', password: 'admin', remember: true }}
            >
              <Form.Item name="account" rules={[{ required: true, message: '请输入账号!' }]}>
                <Input
                  placeholder="账号"
                  className="input_style"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                <Input.Password
                  className="input_style"
                  placeholder="密码"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox style={{ color: 'rgba(255, 255, 255, 0.7)' }}>保持登录</Checkbox>
                </Form.Item>
                <Form.Item noStyle>
                  <span onClick={() => handleForgetPassWord()} className={styles.loginFormForgot}>
                    忘记密码？
                  </span>
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{
                    width: 406,
                    height: 57,
                    background: '#0085FF',
                    borderRadius: 10,
                  }}
                  loading={loginLoading}
                >
                  {loginLoading ? '登录中' : '登录'}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      {renderForgetPassWord()}
    </div>
  )
}
