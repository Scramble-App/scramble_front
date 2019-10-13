import React from "react";
import {Field, Form} from "react-final-form";

const AddCompany = ({onAddCompanyFormSubmit}) => (
  <Form
    onSubmit={onAddCompanyFormSubmit}
    render={({handleSubmit}) => (
      <form onSubmit={handleSubmit}>
        <h1>Add your company</h1>
        <div>
          <label>Company name</label>
          <Field name="name" component="input" type="text" placeholder=""/>
        </div>
        <div>
          <label>Company description</label>
          <Field name="description" component="input" type="text" placeholder=""/>
        </div>
        <div>
          <label>Logo URL</label>
          <Field name="logo_url" component="input" type="text" placeholder=""/>
        </div>
        <button type="submit">Send</button>
      </form>
    )}
  />
)

export default AddCompany
