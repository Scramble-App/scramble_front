import React from 'react'
import {Form as FinalForm} from "react-final-form";
import {Link} from "react-router-dom";
import {Button, Form, PageHeader} from "antd";
import CustomFormField from "../CustomFormField";
import styles from './Login.module.scss'
import Logo from "../Logo";

const Login = ({onLoginFormSubmit}) => (
  <div className={styles.login}>
    <div className={styles.side}>
      <Logo scale={2} />
    </div>
    <div className={styles.form}>
      <h3>Log into Scramble</h3>
      <FinalForm
        onSubmit={onLoginFormSubmit}
        render={({handleSubmit}) => (
          <Form onSubmit={handleSubmit}>
            <Form.Item>
              <CustomFormField type="email" name="email" placeholder="Email" icon="mail"/>
            </Form.Item>
            <Form.Item>
              <CustomFormField type="password" name="password" placeholder="Password" icon="lock"/>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Log in
              </Button>
              <span className={styles.or}>or</span>
              <Link to='/signup'>
                sign up
              </Link>
            </Form.Item>
          </Form>
        )}
      />
          </div>
  </div>
)

export default Login
