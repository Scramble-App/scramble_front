import React from 'react'
import {Form as FinalForm} from "react-final-form";
import {Link} from "react-router-dom";
import {Button, Form, PageHeader} from "antd";
import styles from "../Login/Login.module.scss";
import CustomFormField from "../CustomFormField";

const Signup = ({onSignupFormSubmit}) => (
  <PageHeader title="Please, sign up" className={styles.formWrapper}>
    <FinalForm
      onSubmit={onSignupFormSubmit}
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
              Sign up
            </Button>
            <span className={styles.or}>or</span>
            <Link to='/login'>
              login
            </Link>
          </Form.Item>
        </Form>
      )}
    />
  </PageHeader>
)

export default Signup
