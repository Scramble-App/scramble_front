import React from 'react'
import {Menu} from "antd";
import {Link, withRouter} from "react-router-dom";
import styles from './HeaderMenu.module.scss'

const HeaderMenu = ({ location }) => (
  <>
    <Menu
      mode="horizontal"
      theme="dark"
      selectedKeys={[location.pathname]}
      className={styles.menu}
      style={{lineHeight: '64px', background: '#ffd200'}}
    >
      <Menu.Item key="/companies">
        <Link className={styles.link} to="/companies">Companies</Link>
      </Menu.Item>

      <Menu.Item key="/requests">
        <Link className={styles.link} to="/requests">Requests</Link>
      </Menu.Item>
      <Menu.Item key="/fundraising">
        <Link className={styles.link} to="/fundraising">Financing</Link>
      </Menu.Item>
      <Menu.Item key="/my-company">
        <Link className={styles.link} to="/my-company">Profile</Link>
      </Menu.Item>

      {/*<Menu.Item key={4}>*/}
      {/*  <Badge count={1} dot>*/}
      {/*    <Icon type="notification" />*/}
      {/*  </Badge>*/}
      {/*</Menu.Item>*/}
    </Menu>
  </>
)

export default withRouter(HeaderMenu)
