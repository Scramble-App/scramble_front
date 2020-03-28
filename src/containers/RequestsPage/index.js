import React, {useCallback, useEffect} from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {incomeRequestsSelector, outcomeRequestsSelector} from "../../ducks/requests/selectors";
import {incomeSwapsSelector, outcomeSwapsSelector} from "../../ducks/swaps/selectors";
import styles from "../CompaniesList/CompaniesList.module.scss";
import * as _ from 'lodash'
import CompanyCard from "../../components/CompanyCard/CompanyCard";
import Button from "antd/es/button";

const RequestsPage = ({outcomeRequests, incomeRequests, dispatch, incomeSwaps, outcomeSwaps}) => {
  useEffect((...props) => {
    dispatch({type: 'FETCH_COMPANIES_REQUEST'})
    dispatch({type: 'GET_WATCHLISTS_REQUEST'})
    dispatch({type: 'FETCH_SWAPS_REQUEST'})
  }, [])

  const income = [...incomeRequests, ...incomeSwaps]
  const outcome = [...outcomeRequests, ...outcomeSwaps]
  let requests = [...income, ...outcome]
  requests = _.orderBy(requests, 'created_at', ['desc'])
  requests = _.sortBy(requests, item => item.status === 'pending' ? 0 : 1)

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
    <div className={`${styles.wrapper} ${styles.requestsWrapper}`}>
      <h2 className={styles.pageTitle}>Your requests</h2>
      <div className={styles.requests}>
        {requests.length > 0 ?
          requests.map(item => {
            const subject = item.subtype === 'income' ? item.sender : item.target

            if (!subject) return ''

            return (
              <div key={`${item.type}_${item.id}`} className={styles.requestCard}>
                <div>
                  <h3 className={styles.requestType}>
                    {item.subtype === 'income' ? 'Income' : 'Outcome'} {item.type} request
                    <span className={`${styles.status} ${styles[item.status]}`}>{item.status}</span>
                  </h3>
                  <span className={styles.date}>{(new Date(item.created_at)).toDateString()}</span>
                </div>
                <div className={styles.requestInfo}>
                  <div className={styles.ownerInfo}>
                    <CompanyCard company={subject}/>
                    {item.subtype === 'income' && item.status === 'pending' &&
                    <>
                      <Button onClick={() => reject(item)} className={styles.rejectButton}>Reject</Button>
                      <Button onClick={() => approve(item)} type={"primary"}>Accept</Button>
                    </>
                    }
                  </div>
                </div>
              </div>
            )
          })
          :
          <div>
            <h3>There are no requests at the moment</h3>
            <p>Try to <Link to="/companies">browse companies</Link> and send few watchlist requests to get started</p>
          </div>
        }
      </div>
    </div>
  )
};

export default connect(state => ({
  outcomeRequests: outcomeRequestsSelector(state),
  incomeRequests: incomeRequestsSelector(state),
  outcomeSwaps: outcomeSwapsSelector(state),
  incomeSwaps: incomeSwapsSelector(state),
}), null)(RequestsPage)
