import React from 'react'
import {Icon, Input} from "antd";
import {Field} from "react-final-form";

const CustomFormField = ({name, placeholder, icon, type = 'text'}) => (
  <Field name={name} render={
    ({input}) => (<Input
        {...input}
        prefix={icon ? <Icon type={icon} style={{color: 'rgba(0,0,0,.25)'} }/> : <span />}
        placeholder={placeholder}
      />
    )
  } type={type} />
)

export default CustomFormField
