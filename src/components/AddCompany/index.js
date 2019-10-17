import React from "react";
import {Field, Form as FinalForm} from "react-final-form";
import {Button, Form, PageHeader} from "antd";
import styles from "../Login/Login.module.scss";
import CustomFormField from "../CustomFormField";

const AddCompany = ({onAddCompanyFormSubmit}) => (
  <PageHeader title="Add your company information " className={styles.formWrapper}>

  <FinalForm
    onSubmit={onAddCompanyFormSubmit}
    render={({handleSubmit}) => (
      <Form onSubmit={handleSubmit}>

        <Form.Item>
          <CustomFormField name="name" placeholder="Company name" />
        </Form.Item>
        <Form.Item>
          <CustomFormField name="description" placeholder="Company description" />
        </Form.Item>
        <Form.Item>
          <CustomFormField name="logo_url" placeholder="Logo URL" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>
    )}
  />
  </PageHeader>
)

export default AddCompany
