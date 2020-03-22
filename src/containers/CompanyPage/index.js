import React, {useCallback, useEffect} from 'react'
import styles from './CompanyPage.module.scss'
import {connect} from "react-redux";
import {Button, Table} from "antd";
import {
  companiesListSelector,
  matchedCompanySelector,
  ownCompanyActiveFundraisingSelector,
  ownCompanySelector
} from "../../ducks/companies/selectors";
import {matchedOutcomeRequestsSelector} from "../../ducks/requests/selectors";
import CompanyCard from "../../components/CompanyCard/CompanyCard";
import * as _ from 'lodash'

const CompanyPage = ({company, ownCompany, dispatch, outcomeRequests, match, companies, activeFundraising = {}}) => {
  useEffect(() => {
    dispatch({type: 'GET_WATCHLISTS_REQUEST'})
    dispatch({type: 'FETCH_COMPANY_REQUEST', payload: {companyId: match.params.companyId}})
  }, [])

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
  const watchlist = ownCompany.watchlist || []
  const isCompanyInWatchList = watchlist.some(id => id === company.id)
  const outcomeWatchlistRequest = outcomeRequests.find(req => req.type === 'watchlist' && req.target.id === company.id)
  const existingSwap = (activeFundraising.swaps || []).find(req => req.target === company.id || req.sender === company.id)

  // TODO reuse with Requests page
  const approve = useCallback(({id, type, sender, target}) => {
    const action = type === 'swap' ? 'UPDATE_SWAP_REQUEST' : 'UPDATE_WATCHLIST_REQUEST'
    dispatch({
      type: action,
      payload: {
        id,
        sender: sender.id,
        target: target.id,
        status: 'accepted'
      }
    })
  }, [])

  const reject = useCallback(({id, type, sender, target}) => {
    const action = type === 'swap' ? 'UPDATE_SWAP_REQUEST' : 'UPDATE_WATCHLIST_REQUEST'
    dispatch({
      type: action,
      payload: {
        id,
        sender: sender.id,
        target: target.id,
        status: 'declined'
      }
    })
  }, [])

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
          <div className={styles.actions}>
            {!isCompanyInWatchList && !outcomeWatchlistRequest &&
            <Button type="primary" onClick={sendWatchlistRequest}>Add to watchlist</Button>}

            {outcomeWatchlistRequest && <p>Watchlist request: {outcomeWatchlistRequest.status}</p>}

            {!ownCompany.is_available_to_trade || !ownCompany.has_active_fundraising ?
              <>
                {!ownCompany.has_active_fundraising ?
                  <div>You have no active fundraising period at the moment</div>
                  :
                  <div>You have already reached your fundraising limit</div>
                }
              </>
              :
              <>
                {!company.is_available_to_trade || !company.has_active_fundraising ?
                  <>
                    {!company.has_active_fundraising ?
                      <div>{company.name} is not available to trade at the moment</div>
                      :
                      <div>{company.name} has reached its fundraising limit</div>
                    }
                  </>
                  :
                  <>
                    {activeFundraising && !existingSwap &&
                    <Button type="primary" onClick={sendSwapRequest}>Send swap request</Button>}

                    {existingSwap &&
                    <div>
                      <p style={{marginBottom: 10}}>Swap request: {existingSwap.status}</p>
                      {existingSwap.target === ownCompany.id && existingSwap.status === 'pending' &&
                      <>
                        <Button onClick={() => reject(existingSwap)} className={styles.rejectButton}>Reject</Button>
                        &nbsp;<Button onClick={() => approve(existingSwap)} type={"primary"}>Accept</Button>
                      </>
                      }
                    </div>}
                  </>
                }
              </>
            }
          </div>
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
    activeFundraising: ownCompanyActiveFundraisingSelector(state, props)
  }),
  null
)(CompanyPage)
