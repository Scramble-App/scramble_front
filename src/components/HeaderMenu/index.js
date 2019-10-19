import React from 'react'
import {Badge, Icon, Menu} from "antd";
import {Link, withRouter} from "react-router-dom";

const HeaderMenu = ({ location }) => (
  <>
    <Menu
      mode="horizontal"
      theme="dark"
      selectedKeys={[location.pathname]}
      style={{lineHeight: '64px'}}
    >
      <Menu.Item key="/companies">
        <Link to="/companies">Companies</Link>
      </Menu.Item>

      <Menu.Item key="/requests">
        <Link to="/requests">Requests</Link>
      </Menu.Item>

      <Menu.Item key="/my-company">
        <Link to="/my-company">My Company</Link>
      </Menu.Item>

      <Menu.Item key="/account">
        <Link to="/account">My Account</Link>
      </Menu.Item>
      <Menu.Item key={4}>
        <Badge count={1} dot>
          <Icon type="notification" />
        </Badge>
      </Menu.Item>
    </Menu>
  </>
)

export default withRouter(HeaderMenu)
