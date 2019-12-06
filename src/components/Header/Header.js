import React from 'react';
import {Link} from "react-router-dom";
import Logo from "../Logo";
import HeaderMenu from "../HeaderMenu";
import styles from './Header.module.scss'

const Header = () => (
  <div className={styles.header}>
    <div className={`${styles.wrapper} ${styles.headerWrapper}`}>
      <Link to="/">
        <Logo/>
      </Link>
      <HeaderMenu/>
    </div>
  </div>
)

export default Header;