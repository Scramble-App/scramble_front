import React from 'react'
import {Form as FinalForm} from "react-final-form";
import {Link} from "react-router-dom";
import {Button, Form} from "antd";
import styles from "../Login/Login.module.scss";
import CustomFormField from "../CustomFormField";
import Logo from "../Logo";

const Signup = ({onSignupFormSubmit}) => (
  <div className={styles.login}>
    <div className={styles.side}>
      <Logo scale={2}/>
    </div>
    <div className={styles.form}>
      <h3>Signup</h3>
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
              <CustomFormField type="text" name="first_name" placeholder="First Name"/>
            </Form.Item>
            <Form.Item>
              <CustomFormField type="text" name="last_name" placeholder="Last Name"/>
            </Form.Item>
            {/*<Form.Item>*/}
            {/*  <Field name="photo">*/}
            {/*    {(props) => (*/}
            {/*      <DropzoneComp {...props.input}/>*/}
            {/*    )}*/}
            {/*  </Field>*/}
            {/*</Form.Item>*/}
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
    </div>
  </div>
)

export default Signup
