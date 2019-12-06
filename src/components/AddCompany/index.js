import React from "react";
import {Field, Form as FinalForm} from "react-final-form";
import {Button, Form, PageHeader} from "antd";
import styles from "../Login/Login.module.scss";
import CustomFormField from "../CustomFormField";
import DropzoneComp from "../Dropzone/Dropzone";
import Logo from "../Logo";


const AddCompany = ({onAddCompanyFormSubmit}) => {
  return (
    <div className={styles.login}>
      <div className={styles.side}>
        <Logo scale={2}/>
      </div>
      <div className={styles.form}>
        <h3>Add your company information</h3>
        <FinalForm
          onSubmit={onAddCompanyFormSubmit}
          render={({handleSubmit}) => {
            return (
              <Form onSubmit={handleSubmit}>

                <Form.Item>
                  <CustomFormField name="name" placeholder="Company name"/>
                </Form.Item>
                <Form.Item>
                  <CustomFormField name="description" placeholder="Company description"/>
                </Form.Item>
                <Form.Item>
                  <Field name="logo">
                    {(props) => (
                      <DropzoneComp title="Company logo" {...props.input}/>
                    )}
                  </Field>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Send
                  </Button>
                </Form.Item>
              </Form>
            )
          }}
        />
      </div>
    </div>
  )
}

export default AddCompany
