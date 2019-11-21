import React, {useEffect} from "react";
import {Button, Col, Collapse, Form, Row, Table, Tabs} from "antd";
import {Link} from "react-router-dom";
import style from "./MyCompany.module.scss"
import {Field, Form as FinalForm} from "react-final-form";
import {connect} from "react-redux";
import {ownCompanySelector} from "../../ducks/companies/selectors";
import {updatesSelector} from "../../ducks/updates/selectors";


const MyCompany = ({company, dispatch, updates, onMyCompanyFormSubmit}) => {
  useEffect(() => {
    dispatch({type: 'FETCH_COMPANIES_REQUEST'})
    dispatch({type: 'FETCH_UPDATES_REQUEST'})
  }, [])
  return (
    <Row>
      <Col offset={4} span={16}>
        <Tabs defaultActiveKey="updates">
          <Tabs.TabPane key="info" tab="Info">
            <h2>Company info</h2>
            <div>{company.name}</div>
          </Tabs.TabPane>
          <Tabs.TabPane key="powerbi" tab="Power BI">
            <iframe title="company PowerBI" width="100%" height="541.25"
                    src="https://app.powerbi.com/reportEmbed?reportId=034bdd15-a2b0-4223-a375-26f6d9320a59&autoAuth=true&ctid=dd0bea93-74d1-4e09-bf5f-8d90c0308096&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLWItcHJpbWFyeS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D"
                    frameBorder="0" allowFullScreen="true"/>
          </Tabs.TabPane>
          <Tabs.TabPane key="updates" tab="Updates">
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
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  )
}
export default connect(
  (state) => ({
    company: ownCompanySelector(state),
    updates: updatesSelector(state)
  }),
  null
)(MyCompany)
