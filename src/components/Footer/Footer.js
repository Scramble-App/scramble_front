import React from 'react';
import classNames from 'classnames';

import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <i className={classNames(styles.scramble, styles.scrambleLogo)}/>
      </div>
      <div className={styles.copyright}>&copy; 2020 scramble. All rights reserved</div>
      <div className={styles.address}>950 Page Mill Road, Palo Alto, CA 94304, USA</div>
      <ul className={styles.social}>
        <li>
          <a href="https://www.facebook.com/ScrambleUpCom/" target="_blank" rel="noopener">
            <i className={classNames(styles.scramble, styles.scrambleFacebook)}/>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/company/scrambleup" target="_blank" rel="noopener">
            <i className={classNames(styles.scramble, styles.scrambleLinkedin)}/>
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
