import React from 'react'
import {Field, Form} from "react-final-form";
import { Link } from "react-router-dom";

const Signup = ({ onSignupFormSubmit }) => {
  return (
    <Form
      onSubmit={onSignupFormSubmit}
      render={({handleSubmit}) => (
        <form onSubmit={handleSubmit}>
          <h2>Please, sign up</h2>
          <div>
            <label>Your email:</label>
            <Field name="email" component="input" type="email" placeholder="email@example.com" />
          </div>
          <div>
            <label>Your password:</label>
            <Field name="password" component="input" type="password" placeholder="********" />
          </div>
          <button type="submit">Send</button>
          or
          <Link to='/login'>
            <button>Log in</button>
          </Link>
        </form>
      )}
    />
  )
}

export default Signup
