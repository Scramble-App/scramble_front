import React, {useCallback} from "react";
import {Field, Form as FinalForm} from "react-final-form";
import {Button, Form, PageHeader} from "antd";
import styles from "../Login/Login.module.scss";
import CustomFormField from "../CustomFormField";
import DropzoneComp from "./Dropzone";

import Dropzone, {useDropzone} from "react-dropzone";


const AddCompany = ({onAddCompanyFormSubmit}) => {
  return (
    <PageHeader title="Add your company information " className={styles.formWrapper}>

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
              <Field name="logo">
                {
                  (props) => (
                    <DropzoneComp {...props.input}/>
                  )
                }



                {/*{(props) => {*/}
                {/*  return (*/}
                {/*  <Dropzone {...props.input}>*/}
                {/*    {({getRootProps, getInputProps}) => (*/}
                {/*      <section>*/}
                {/*        <div {...getRootProps()}>*/}
                {/*          <input {...getInputProps()} />*/}
                {/*          <p>Drag 'n' drop some files here, or click to select files</p>*/}
                {/*        </div>*/}
                {/*      </section>*/}
                {/*    )}*/}
                {/*  </Dropzone>*/}
                {/*)}}*/}
              </Field>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Send
                </Button>
              </Form.Item>
            </Form>
          )
        }}
      />
    </PageHeader>
  )
}

export default AddCompany
