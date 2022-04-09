import * as React from 'react'
import { Button } from 'antd'
import usePermission from '@/assets/utils/permission'
import { SizeType } from './SizeContext'
declare const ButtonTypes: ['default', 'primary', 'ghost', 'dashed', 'link', 'text']
declare const HtmlTypes: ['button', 'submit', 'reset', undefined]

declare type ButtonType = typeof ButtonTypes[number]
declare type HtmlType = typeof HtmlTypes[number]

/**
 * @btnName 按钮名称
 * @auth 权限名称
 * @styleProps 自定义样式
 * @handleFunProps 函数
 * @originalProps antd组件自带样式配置
 */

type Props = {
  children: React.ReactNode
  show?: boolean
  auth?: string
  styleProps?: any
  onClick: (e?: any) => void
  originalProps?: {
    type: ButtonType
    size?: SizeType
    danger?: boolean
    icon?: React.ReactNode
    disabled?: boolean
    download?: string
    href?: string
    htmlType?: HtmlType
  }
}

const Authorized: React.FC<Props> = React.memo(
  ({ children, show = true, originalProps, styleProps, auth, onClick }): JSX.Element => {
    const { HasPermission } = usePermission()

    const isAuth = process.env.NODE_ENV === 'development' ? HasPermission(auth) : HasPermission(auth)

    return (
      <React.Fragment>
        {isAuth && show ? (
          <Button
            {...originalProps}
            style={{ ...styleProps }}
            onClick={e => {
              onClick(e)
            }}
          >
            {children}
          </Button>
        ) : null}
      </React.Fragment>
    )
  }
)

export default Authorized
