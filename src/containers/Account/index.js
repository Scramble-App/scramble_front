import React from "react";
import {connect} from "react-redux";
import {Button, Col, Row} from "antd";
import {currentUserSelector} from "../../ducks/users/selectors";

const Account = ({ user, dispatch }) => (
  <Row>
    <Col span={12} offset={4}>
      <h2>My account</h2>
      <p>Email: {user.email}</p>
      <p>Full name: {user.first_name} {user.last_name}</p>
      <Button onClick={() => dispatch({type: 'LOGOUT_REQUEST'})}>Log out</Button>
    </Col>
  </Row>
);

export default connect(
  state => ({
    user: currentUserSelector(state)
  }),
  null
)(Account)



