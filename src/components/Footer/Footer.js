import React from 'react';
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerInner}>
        © Scramble, 2019
      </div>
    </div>
  );
};

export default Footer;