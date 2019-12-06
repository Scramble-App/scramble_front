import React from 'react'
import styles from './Logo.module.scss'

const Logo = ({ scale = 1}) => (
  <div className={styles.logo} style={{transform: `scale(${scale})`}} />
)

export default Logo
