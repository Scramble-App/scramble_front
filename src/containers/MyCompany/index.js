import React, {useEffect} from "react";
import {Button, Form} from "antd";
import {Field, Form as FinalForm} from "react-final-form";
import {connect} from "react-redux";
import {ownCompanySelector} from "../../ducks/companies/selectors";
import {updatesSelector} from "../../ducks/updates/selectors";
import {currentUserSelector} from "../../ducks/users/selectors";
import CompanyCard from "../../components/CompanyCard/CompanyCard";
import styles from './MyCompany.module.scss'


const MyCompany = ({company, dispatch, updates, onMyCompanyFormSubmit, user}) => {
  useEffect(() => {
    dispatch({type: 'FETCH_COMPANIES_REQUEST'})
    dispatch({type: 'FETCH_UPDATES_REQUEST'})
  }, [])
  return (
    <div className={`${styles.wrapper} ${styles.accountWrapper}`}>
      <div>
          <h2 className={styles.pageTitle}>My account</h2>
          <p className={styles.field}>Email: {user.email}</p>
          <p className={styles.field}>Full name: {user.first_name} {user.last_name}</p>
          <Button type="primary" onClick={() => dispatch({type: 'LOGOUT_REQUEST'})}>Log out</Button>
      </div>
      <div>
          <h2 className={styles.pageTitle}>Company info</h2>
        <CompanyCard company={company} />
      </div>

        <div className={styles.updates}>
          <h2>Add company update</h2>
          <FinalForm
            onSubmit={onMyCompanyFormSubmit}
            render={({handleSubmit, form}) => (
              <Form onSubmit={(event) => {
                handleSubmit(event)
                form.reset()
              }}>
                <Field
                  name="text"
                  component="textarea"
                  className={styles.textarea}
                  placeholder="Update notes"
                >
                </Field>
                <br/>
                <Button type="primary"
                        htmlType="submit">Add</Button>
              </Form>
            )}
          />
        </div>
    </div>

  )
}
export default connect(
  (state) => ({
    company: ownCompanySelector(state),
    updates: updatesSelector(state),
    user: currentUserSelector(state)
  }),
  null
)(MyCompany)
