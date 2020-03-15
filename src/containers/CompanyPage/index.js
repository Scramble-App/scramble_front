import React, {useCallback, useEffect} from 'react'
import styles from './CompanyPage.module.scss'
import {connect} from "react-redux";
import {Button, Table} from "antd";
import {companiesListSelector, matchedCompanySelector, ownCompanySelector} from "../../ducks/companies/selectors";
import {matchedOutcomeRequestsSelector} from "../../ducks/requests/selectors";
import CompanyCard from "../../components/CompanyCard/CompanyCard";
import * as _ from 'lodash'

const CompanyPage = ({company, ownCompany, dispatch, outcomeRequests, match, companies}) => {
  useEffect(() => {
    dispatch({type: 'GET_WATCHLISTS_REQUEST'})
    dispatch({type: 'FETCH_COMPANY_REQUEST', payload: {companyId: match.params.companyId}})
  }, []);
  const sendWatchlistRequest = useCallback(() => {
    dispatch({
      type: 'SEND_WATCHLIST_REQUEST_REQUEST',
      payload: {
        target: company.id,
        sender: ownCompany.id
      }
    })
  }, [company, ownCompany])

  const sendSwapRequest = useCallback(() => {
    dispatch({
      type: 'ADD_SWAP_REQUEST',
      payload: {
        target: company.id,
        sender: ownCompany.id
      },
    })
  }, [company, ownCompany])

  const seeAlso = companies
    .filter(c => c.id !== company.id && c.id !== ownCompany.id)
    .slice(0, 2)

  const isOwnCompanyPage = company.id === ownCompany.id

  return (
    <div className={`${styles.wrapper} ${styles.companyPage}`}>
      <div className={styles.company}>
        <div>
          <h2 className={styles.companyName}>{company.name}</h2>
          <p className={styles.owner}>by {company.founder}</p>
          <h3 className={styles.aboutTitle}>About this company</h3>
          {company.description && <p>{company.description}</p>}
        </div>
        <div className={styles.rightSide}>
          <div className={styles.logoWrapper}>
            <img
              className={styles.companyLogo}
              src={company.logo}
              alt="Logo"
            />
          </div>
          {!isOwnCompanyPage &&
          <>
            {/* TODO God */}
            {ownCompany.watchlist && !ownCompany.watchlist.some(id => id === company.id) && !outcomeRequests.some(req => req.type === 'watchlist' && req.target.id === company.id) &&
            <Button type="primary" onClick={sendWatchlistRequest}>Add to watchlist</Button>
            }
            {/* TODO holy shit */}
            {!ownCompany.fundraising[0].swaps.some(req => req.target === company.id || req.sender === company.id) &&
            <Button type="primary" onClick={sendSwapRequest}>Send swap request</Button>
            }
          </>
          }

        </div>
      </div>

      <div>
        {_.get(company, 'updates.length') > 0 &&
        <>
          <h4 className={styles.aboutTitle}>Monthly updates</h4>
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
      {seeAlso.length > 0 &&

      <div className={styles.seeAlso}>
        <h3>See also</h3>
        <div className={styles.seeAlsoList}>
          {seeAlso.map(company => <CompanyCard key={company.id} company={company}/>)}
        </div>
      </div>
      }
    </div>

  )
};

export default connect(
  (state, props) => ({
    company: matchedCompanySelector(state, props),
    ownCompany: ownCompanySelector(state),
    outcomeRequests: matchedOutcomeRequestsSelector(state, props),
    companies: companiesListSelector(state),
  }),
  null
)(CompanyPage)
