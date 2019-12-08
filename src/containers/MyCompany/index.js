import React, {useEffect} from "react";
import {Button, Col, Form, Row, Table} from "antd";
import styles from "./MyCompany.module.scss"
import {Field, Form as FinalForm} from "react-final-form";
import {connect} from "react-redux";
import {ownCompanySelector} from "../../ducks/companies/selectors";
import {updatesSelector} from "../../ducks/updates/selectors";
import {currentUserSelector} from "../../ducks/users/selectors";
import CompanyCard from "../../components/CompanyCard/CompanyCard";


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

          {/*<div>*/}
          {/*  <h2>Add company update</h2>*/}
          {/*  <FinalForm*/}
          {/*    onSubmit={onMyCompanyFormSubmit}*/}
          {/*    render={({handleSubmit}) => (*/}
          {/*      <Form onSubmit={handleSubmit}>*/}
          {/*        <Field*/}
          {/*          name="text"*/}
          {/*          component="textarea"*/}
          {/*          className={style.textarea}*/}
          {/*        >*/}
          {/*        </Field>*/}
          {/*        <br/>*/}
          {/*        <Button type="primary"*/}
          {/*                htmlType="submit">Add</Button>*/}
          {/*      </Form>*/}
          {/*    )}*/}
          {/*  />*/}
          {/*</div>*/}
          {/*<h2>Your company's updates</h2>*/}
          {/*<Table*/}
          {/*  columns={[*/}
          {/*    {*/}
          {/*      title: 'Update',*/}
          {/*      dataIndex: 'text',*/}
          {/*      key: 'update'*/}
          {/*    },*/}
          {/*    {*/}
          {/*      title: 'Date',*/}
          {/*      dataIndex: 'created_at',*/}
          {/*      key: 'date',*/}
          {/*      render: text => <span>{(new Date(text)).toDateString()}</span>*/}
          {/*    }*/}
          {/*  ]}*/}
          {/*  dataSource={updates}*/}
          {/*/>*/}
      {/*  <iframe title="company PowerBI" width="100%" height="541.25"*/}
      {/*          src="https://app.powerbi.com/reportEmbed?reportId=034bdd15-a2b0-4223-a375-26f6d9320a59&autoAuth=true&ctid=dd0bea93-74d1-4e09-bf5f-8d90c0308096&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLWItcHJpbWFyeS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D"*/}
      {/*          frameBorder="0" allowFullScreen="true"/>*/}
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
