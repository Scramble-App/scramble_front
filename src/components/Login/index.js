import React from 'react'
import {Field, Form as FinalForm} from "react-final-form";
import {Button, Form} from "antd";
import CustomFormField from "../CustomFormField";
import styles from './Login.module.scss'
import Logo from "../Logo";

const Login = ({onLoginFormSubmit}) => (
  <div className={styles.login}>
    <div className={styles.loginHeader}>
      <Logo white />
      <div className={styles.loginClose}>
        <a href="https://scrambleup.com">X</a>
      </div>
    </div>
    <div className={styles.form}>
      <FinalForm
        onSubmit={onLoginFormSubmit}
        render={({handleSubmit}) => (
          <Form onSubmit={handleSubmit}>
            <label>Login</label>
              <Field  type="email" component="input" name="email" placeholder="Enter email" />
            <label>Password</label>
              <Field  type="password" component="input" name="password" placeholder="Enter password" />
              <button type="submit">
                Login
              </button>
              {/*<span className={styles.or}>or</span>*/}
              {/*<Link to='/signup'>*/}
              {/*  sign up*/}
              {/*</Link>*/}
          </Form>
        )}
      />
          </div>
  </div>
)

export default Login
