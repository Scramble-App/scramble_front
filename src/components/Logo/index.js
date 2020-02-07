import React from 'react'
import styles from './Logo.module.scss'

const Logo = ({ scale = 1, white = false}) => (
  <div className={`${styles.logo} ${white ? styles.white : ''}`} style={{transform: `scale(${scale})`}} />
)

export default Logo
