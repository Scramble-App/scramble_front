import React from 'react';
import styles from './Footer.module.scss'
import {Icon} from "antd";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.wrapper}>
        <p><Icon type="mail" /> info@scrambleup.com</p>
        <p>© Scramble, 2019</p>
      </div>
    </div>
  );
};

export default Footer;