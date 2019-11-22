import React, {useEffect} from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {incomeRequestsSelector, outcomeRequestsSelector} from "../../ducks/requests/selectors";
import {Button, Checkbox, Col, Divider, Row, Table, Tabs} from "antd";
import {incomeSwapsSelector, outcomeSwapsSelector} from "../../ducks/swaps/selectors";

const RequestsPage = ({outcomeRequests, incomeRequests, dispatch, incomeSwaps, outcomeSwaps}) => {
  useEffect((...props) => {
    dispatch({type: 'FETCH_COMPANIES_REQUEST'})
    dispatch({type: 'GET_WATCHLISTS_REQUEST'})
    dispatch({type: 'FETCH_SWAPS_REQUEST'})
  }, [])

  const income = [...incomeRequests, ...incomeSwaps]
  const outcome = [...outcomeRequests, ...outcomeSwaps]

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
                            &&
                          <span>
                            {
                              record.type === 'watchlist'
                              ?
                                <>
                                <Button onClick={() => dispatch({
                                  type: 'UPDATE_WATCHLIST_REQUEST',
                                  payload: {status: 'accepted', id: record.id}
                                })}>Accept</Button>
                                <Divider type="vertical"/>
                                <Button onClick={() => dispatch({
                              type: 'UPDATE_WATCHLIST_REQUEST',
                              payload: {status: 'declined', id: record.id}
                            })}>Decline</Button>
                                </>
                              :
                                <>
                                  <Button onClick={() => dispatch({
                                    type: 'UPDATE_SWAP_REQUEST',
                                    payload: {status: 'accepted', id: record.id}
                                  })}>Accept</Button>
                                  <Divider type="vertical"/>
                                  <Button onClick={() => dispatch({
                                    type: 'UPDATE_SWAP_REQUEST',
                                    payload: {status: 'declined', id: record.id}
                                  })}>Decline</Button>
                                </>
                            }
                        </span>
                        }
                      </>
                    )
                  },
                },
              ]}
              dataSource={income}
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
              dataSource={outcome}
            />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  )
};

export default connect(state => ({
  outcomeRequests: outcomeRequestsSelector(state),
  incomeRequests: incomeRequestsSelector(state),
  outcomeSwaps: outcomeSwapsSelector(state),
  incomeSwaps: incomeSwapsSelector(state),
}), null)(RequestsPage)
