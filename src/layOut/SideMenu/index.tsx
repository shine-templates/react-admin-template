import React, { useState, useEffect, useCallback, memo } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { Badge, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import _ from 'lodash'
import { RouteConfig } from '@/route'
import SvgIcon from '@/components/SvgIcon'
import usePermission from '@/assets/utils/permission'
import { handleOpenkeys } from '@/store/reducers/layoutSlice'

const { SubMenu } = Menu

const MemoMenuComponent = memo(function MenuComponent() {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { HasPermission } = usePermission()
  const [menuKeys, setmenuKeys] = useState<number>(0)
  const [ownDefaultSelectedKeys, setOwnDefaultSelectedKeys] = useState<string[]>([])
  const {
    openKeys,
    openKeys: defaultKeys,
    unHandleNumber,
  } = useSelector((state: RootState) => state.layoutSlice, shallowEqual)

  useEffect(() => {
    setOwnDefaultSelectedKeys([pathname])
  }, [dispatch, pathname])

  useEffect(() => {
    setmenuKeys((key: number) => key + 1)
  }, [ownDefaultSelectedKeys])

  const handleOpenChange = useCallback(
    (keys: any[]) => {
      dispatch(handleOpenkeys(keys))
    },
    [dispatch, openKeys]
  )
  const getIcon = useCallback(
    (v, path) => {
      if (path === ownDefaultSelectedKeys) {
        const _v = v.substring(0, v.length - 1)

        return <SvgIcon iconClass={_v}></SvgIcon>
      } else {
        return <SvgIcon iconClass={v}></SvgIcon>
      }
    },
    [ownDefaultSelectedKeys]
  )

  const renderMenuList = useCallback(
    RouteConfig => {
      return RouteConfig.reduce((pre: JSX.Element[], item: RouteCellObj) => {
        if (HasPermission(item.role) && !item.hidden) {
          if (!_.isEmpty(item.children)) {
            pre.push(
              <SubMenu
                key={item.path}
                title={
                  <span>
                    {item.icon ? getIcon(item.icon, item.path) : null}
                    <span>{item.name}</span>
                  </span>
                }
              >
                {renderMenuList(item.children)}
              </SubMenu>
            )
          } else {
            pre.push(
              <Menu.Item key={item.path}>
                <Link to={item.path}>
                  {item.icon ? getIcon(item.icon, item.path) : null}
                  <span>{item.name}</span>
                  {item.path.includes('/personalManage/leaveManage') ? (
                    <Badge count={unHandleNumber} style={{ marginLeft: '20px' }} />
                  ) : null}
                </Link>
              </Menu.Item>
            )
          }
        }
        return pre
      }, [])
    },
    [HasPermission, getIcon]
  )

  return (
    <Menu
      key={menuKeys}
      onOpenChange={handleOpenChange}
      theme="dark"
      mode="inline"
      defaultSelectedKeys={ownDefaultSelectedKeys}
      openKeys={openKeys}
      defaultOpenKeys={defaultKeys}
    >
      {renderMenuList(RouteConfig)}
    </Menu>
  )
})

export default MemoMenuComponent
