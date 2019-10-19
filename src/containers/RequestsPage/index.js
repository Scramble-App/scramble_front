import React, {useEffect} from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {incomeRequestsSelector, outcomeRequestsSelector} from "../../ducks/requests/selectors";
import {Col, Divider, Row, Table} from "antd";

const RequestsPage = ({outcomeRequests, incomeRequests, dispatch}) => {
  useEffect((...props) => {
    dispatch({type: 'FETCH_COMPANIES_REQUEST'})
    dispatch({type: 'GET_WATCHLISTS_REQUEST'})
  }, [])

  return (
    <Row>
      <Col offset={4} span={4}>
        <h3>Filters:</h3>
        <ul>
          <li>Watch list</li>
          <li>Swaps</li>
        </ul>
      </Col>
      <Col span={12}>
        <h2>Outcome:</h2>
        <Table
          columns={[
            {title: 'Target', dataIndex: 'target', key: 'target', render: target => <Link to={`/companies/${target.id}`}>{target.name}</Link>},
            {title: 'Type', dataIndex: 'type', key: 'type'},
            {title: 'Date', dataIndex: 'date', key: 'date'},
            {title: 'Status', dataIndex: 'status', key: 'status'}
          ]}
          dataSource={outcomeRequests}
        />

        <h2>Income:</h2>
        <Table
          columns={[
            {title: 'Sender', dataIndex: 'sender', key: 'sender', render: sender => <Link to={`/companies/${sender.id}`}>{sender.name}</Link>},
            {title: 'Type', dataIndex: 'type', key: 'type'},
            {title: 'Date', dataIndex: 'date', key: 'date'},
            {title: 'Status', dataIndex: 'status', key: 'status'},
            {title: 'Founder', dataIndex: 'founder', key: 'founder'},
            {
              title: 'Action',
              key: 'action',
              render: (text, record) => (
                <span>
                  <a>Accept</a>
                  <Divider type="vertical" />
                  <a>Decline</a>
                </span>
              ),
            },
          ]}
          dataSource={incomeRequests}
        />
      </Col>
    </Row>
  )
};

export default connect(state => ({
  outcomeRequests: outcomeRequestsSelector(state),
  incomeRequests: incomeRequestsSelector(state)
}), null)(RequestsPage)
