import React, { useState } from 'react'
import { Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import AppMain from './AppMain'
import MenuComponent from './SideMenu'
import MyBreadcrumb from './MyBreadcrumb'
import TopRightDrop from './TopRightDrop/index'
import ModuleScss from './index.module.scss'
import LogoIcon from './logo'
import conf from '@/assets/conf'
import './antd.scss'

const { Header, Sider, Content } = Layout

function LayoutManage() {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  return (
    <Layout className={ModuleScss.wrapperContainer}>
      <Sider trigger={null} collapsible collapsed={collapsed} className={ModuleScss.scroll}>
        <div className={ModuleScss.IconWrapper}>
          <LogoIcon />
          {!collapsed ? <span className={ModuleScss.span}>{conf.title}</span> : null}
        </div>
        <MenuComponent />
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background">
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}

          <MyBreadcrumb />

          <div style={{ float: 'right', marginRight: '20px' }}>
            <TopRightDrop />
          </div>
        </Header>

        <Content className={ModuleScss.contentWrap}>
          <AppMain />
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutManage
