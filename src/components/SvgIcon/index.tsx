import React from 'react'
import styles from './style.module.scss'

interface P {
  iconClass?: string // svg名字
  fill?: string | 'currentColor' // 填充颜色
  ownClass?: string
}

const SvgIcon = (props: P) => {
  const { iconClass, fill, ownClass } = props
  return (
    <i aria-hidden="true" className="anticon">
      <svg className={`${styles['svg-class']} ${ownClass}`}>
        <use xlinkHref={'#icon-' + iconClass} fill={fill} />
      </svg>
    </i>
  )
}

SvgIcon.defaultProps = {
  fill: 'currentColor',
  ownClass: '',
}

export default SvgIcon
