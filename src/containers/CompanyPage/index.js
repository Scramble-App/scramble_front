import React, {useEffect} from 'react'
import styles from './CompanyPage.module.scss'
import {connect} from "react-redux";
import {Button, Col, Row, Table} from "antd";
import {matchedCompanySelector, ownCompanySelector} from "../../ducks/companies/selectors";
import {matchedOutcomeRequestSelector} from "../../ducks/requests/selectors";

const CompanyPage = ({company, ownCompany, dispatch, outcomeRequest, match}) => {
  useEffect(() => {
    dispatch({type: 'GET_WATCHLISTS_REQUEST'})
    dispatch({type: 'FETCH_COMPANY_REQUEST', payload: {companyId: match.params.companyId}})
    console.log(match)
  }, []);

  const sendWatchlistRequest = async () => {
    await new Promise((resolve, reject) => {
      dispatch({
        type: 'SEND_WATCHLIST_REQUEST_REQUEST',
        payload: {
          target: company.id,
          sender: ownCompany.id
        },
        resolve
      })
    })

  }

  return (
    <Row className={styles.companyPage}>
      <Col offset={4} span={14}>
        <h2>{company.name}</h2>
        {company.description && <p>{company.description}</p>}
        <div>
          {company.updates && company.updates.length &&
          <>
            <h4>Monthly updates:</h4>
            <Table
              pagination={false}
              size="middle"
              columns={[
                {
                  title: "Update",
                  dataIndex: 'text',
                  key: 'text'
                },
                {
                  title: "Date",
                  dataIndex: 'created_at',
                  key: "created_at",
                  render: text => <p className={styles.datetime}>{(new Date(text)).toDateString()}</p>
                }
              ]}
              dataSource={company.updates}
            />
          </>
          }
        </div>
      </Col>
      <Col span={2}>
        {company.logo_url &&
        <img
          className={styles.companyLogo}
          src={company.logo_url}
          alt="Logo"
        />
        }
        <div>
          {!outcomeRequest &&
            <Button onClick={sendWatchlistRequest}>Add to watchlist</Button>
          }
          {/*<Button>Swap request</Button>*/}
        </div>
      </Col>
    </Row>
  )
};

export default connect(
  (state, props) => ({
    company: matchedCompanySelector(state, props),
    ownCompany: ownCompanySelector(state),
    outcomeRequest: matchedOutcomeRequestSelector(state, props)
  }),
  null
)(CompanyPage)
