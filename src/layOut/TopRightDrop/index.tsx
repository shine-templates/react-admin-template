import * as React from 'react'
import { Dropdown, Menu, Modal, message, Avatar, Form, Input } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { HomeOutlined, LoginOutlined, EditOutlined, UserOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { useForm } from 'antd/lib/form/Form'
import { modifyPass } from '@/assets/api/login'
import conf from '@/assets/conf'

export default () => {
  const [form] = useForm()
  const { replace } = useHistory()
  const userName = sessionStorage.getItem(conf.SESSION_KEY + 'userName')
  const [isVisible, setIsVisible] = React.useState<boolean>(false)

  const handleLogOut = () => {
    Modal.confirm({
      title: '登出',
      content: '确认登出?',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        doLogOut()
      },
      onCancel: () => {
        message.info('取消登出')
      },
    })
  }

  const doLogOut = () => {
    setTimeout(() => {
      replace('/login')
      sessionStorage.clear()
      localStorage.removeItem('persist:provide')
      message.success('成功登出')
    })
  }

  const handleOk = () => {
    form.validateFields().then(values => {
      modifyPass(values)
        .then(() => {
          message.success('修改密码成功,请重新登录')
          setIsVisible(false)
          replace('/login')
        })
        .catch(err => message.error(err.msg))
    })
  }

  const handleCancel = () => {
    setIsVisible(false)
    form.resetFields()
  }

  const ChangePasswordModal = () => {
    return (
      <Modal
        title="修改密码"
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        destroyOnClose
      >
        <Form form={form} colon={false} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} autoComplete="off">
          <Form.Item label="原始密码" name="oldPass" rules={[{ required: true, message: '请输入您的原始密码' }]}>
            <Input placeholder="请输入您的原始密码" />
          </Form.Item>

          <Form.Item label="新密码" name="newPass" rules={[{ required: true, message: '请输入您的新密码' }]}>
            <Input placeholder="请输入您的新密码"></Input>
          </Form.Item>
        </Form>
      </Modal>
    )
  }

  const renderRoleDrop = () => {
    const menu = (
      <Menu>
        <Menu.Item key={0}>
          <Link to="/Dashboard">
            <HomeOutlined />
            返回首页
          </Link>
        </Menu.Item>
        <Menu.Item key={1}>
          <Link to="#" onClick={() => {}}>
            <EditOutlined />
            修改密码
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={handleLogOut} key={2}>
          <React.Fragment>
            <LoginOutlined />
            退出登录
          </React.Fragment>
        </Menu.Item>
      </Menu>
    )

    return (
      <Dropdown overlay={menu}>
        <span style={{ cursor: 'pointer', paddingLeft: '10px' }}>{userName || '未命名'}</span>
      </Dropdown>
    )
  }

  return (
    <div className={styles.container}>
      <Avatar
        style={{
          marginLeft: 30,
        }}
        icon={<UserOutlined />}
      />

      {renderRoleDrop()}
      {ChangePasswordModal()}
    </div>
  )
}
