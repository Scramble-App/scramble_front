import React, {useEffect} from 'react'
import {Link} from "react-router-dom";
import styles from "./RequestPage.module.scss"
import {connect} from "react-redux";
import {incomeRequestsSelector, outcomeRequestsSelector} from "../../ducks/requests/selectors";
import {Button, Checkbox, Col, Divider, Row, Table, Tabs} from "antd";

const RequestsPage = ({outcomeRequests, incomeRequests, dispatch}) => {
  useEffect((...props) => {
    dispatch({type: 'FETCH_COMPANIES_REQUEST'})
    dispatch({type: 'GET_WATCHLISTS_REQUEST'})
  }, [])

  return (
    <Row>
      <Col offset={4} span={4}>
        <h3>Filters:</h3>
          <Checkbox defaultChecked={true} onChange={e => (`checked = ${e.target.checked}`)}>Watch list</Checkbox>
          <Checkbox defaultChecked={true} onChange={e => (`checked = ${e.target.checked}`)}>Swaps</Checkbox>
      </Col>
      <Col offset={1} span={11}>
        <Tabs>
          <Tabs.TabPane tab="Income" key={2}>
            <Table
              columns={[
                {
                  title: 'Sender',
                  dataIndex: 'sender',
                  key: 'sender',
                  render: sender => <Link to={`/companies/${sender.id}`}>{sender.name}</Link>
                },
                {title: 'Type', dataIndex: 'type', key: 'type'},
                {title: 'Date', dataIndex: 'date', key: 'date'},
                {title: 'Status', dataIndex: 'status', key: 'status'},
                {title: 'Founder', dataIndex: 'founder', key: 'founder'},
                {
                  title: 'Action',
                  key: 'action',
                  render: (text, record) => {
                    return (
                      <>
                        {
                          record.status === 'pending'
                            ?
                            <span>
                          <Button onClick={() => dispatch({
                            type: 'UPDATE_WATCHLIST_REQUEST',
                            payload: {status: 'accepted', id: record.id}
                          })}>Accept</Button>
                          <Divider type="vertical"/>
                          <Button onClick={() => dispatch({
                            type: 'UPDATE_WATCHLIST_REQUEST',
                            payload: {status: 'declined', id: record.id}
                          })}>Decline</Button>
                        </span>
                            :
                            ''
                        }
                      </>

                    )

                  },
                },
              ]}
              dataSource={incomeRequests}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Outcome" key={1}>
            <Table
              columns={[
                {
                  title: 'Target',
                  dataIndex: 'target',
                  key: 'target',
                  render: target => <Link to={`/companies/${target.id}`}>{target.name}</Link>
                },
                {title: 'Type', dataIndex: 'type', key: 'type'},
                {title: 'Date', dataIndex: 'date', key: 'date'},
                {title: 'Status', dataIndex: 'status', key: 'status'}
              ]}
              dataSource={outcomeRequests}
            />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  )
};

export default connect(state => ({
  outcomeRequests: outcomeRequestsSelector(state),
  incomeRequests: incomeRequestsSelector(state)
}), null)(RequestsPage)
