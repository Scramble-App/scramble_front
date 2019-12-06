import React, {useEffect} from "react";
import {Button, Col, Collapse, Form, Row, Table, Tabs} from "antd";
import {Link} from "react-router-dom";
import style from "./MyCompany.module.scss"
import {Field, Form as FinalForm} from "react-final-form";
import {connect} from "react-redux";
import {ownCompanySelector} from "../../ducks/companies/selectors";
import {updatesSelector} from "../../ducks/updates/selectors";
import {currentUserSelector} from "../../ducks/users/selectors";


const MyCompany = ({company, dispatch, updates, onMyCompanyFormSubmit, user}) => {
  useEffect(() => {
    dispatch({type: 'FETCH_COMPANIES_REQUEST'})
    dispatch({type: 'FETCH_UPDATES_REQUEST'})
  }, [])
  return (
    <div>
      <Row>
        <Col offset={4} span={16}>
          <h2>Company info</h2>
          <div>{company.name}</div>
          <div>
            <h2>Add company update</h2>
            <FinalForm
              onSubmit={onMyCompanyFormSubmit}
              render={({handleSubmit}) => (
                <Form onSubmit={handleSubmit}>
                  <Field
                    name="text"
                    component="textarea"
                    className={style.textarea}
                  >
                  </Field>
                  <br/>
                  <Button type="primary"
                          htmlType="submit">Add</Button>
                </Form>
              )}
            />
          </div>
          <br/>
          <h2>Your company's updates</h2>
          <Table
            columns={[
              {
                title: 'Update',
                dataIndex: 'text',
                key: 'update'
              },
              {
                title: 'Date',
                dataIndex: 'created_at',
                key: 'date',
                render: text => <span>{(new Date(text)).toDateString()}</span>
              }
            ]}
            dataSource={updates}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={4}>
          <h2>My account</h2>
          <p>Email: {user.email}</p>
          <p>Full name: {user.first_name} {user.last_name}</p>
          <Button onClick={() => dispatch({type: 'LOGOUT_REQUEST'})}>Log out</Button>
        </Col>
      </Row>

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
