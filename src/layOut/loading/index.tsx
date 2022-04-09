import React from 'react'
import styles from './index.module.scss'
import { Spin } from 'antd'
type Props = {}

const Loading: React.FC<Props> = () => {
  return (
    <div className={styles.wrapper}>
      <Spin tip="Loading..." size="large" />
    </div>
  )
}

export default Loading
