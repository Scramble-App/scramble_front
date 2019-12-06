import React, {useEffect} from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {incomeRequestsSelector, outcomeRequestsSelector} from "../../ducks/requests/selectors";
import {incomeSwapsSelector, outcomeSwapsSelector} from "../../ducks/swaps/selectors";
import styles from "../CompaniesList/CompaniesList.module.scss";
import * as _ from 'lodash'

const RequestsPage = ({outcomeRequests, incomeRequests, dispatch, incomeSwaps, outcomeSwaps}) => {
  useEffect((...props) => {
    dispatch({type: 'FETCH_COMPANIES_REQUEST'})
    dispatch({type: 'GET_WATCHLISTS_REQUEST'})
    dispatch({type: 'FETCH_SWAPS_REQUEST'})
  }, [])

  const income = [...incomeRequests, ...incomeSwaps]
  // TODO outcome
  const outcome = [...outcomeRequests, ...outcomeSwaps]

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.requestsWrapper}>
        {[...income, ...outcome].map(item => (
          <div key={item.id} className={styles.requestCard}>
            <div>
              <span className={styles.requestType}>{item.type === 'swap' ? 'Swap' : 'Watchlist'} request</span>
              <span>{(new Date(item.created_at)).toDateString()}</span>
              <button className={styles.rejectButton}>Reject</button>
              <button className={styles.acceptButton}>Accept</button>
            </div>
            <div className={styles.requestInfo}>
              <div>
                <img className={styles.companyLogo} src='https://i1.wp.com/ebenezersuites.com/wp-content/uploads/2016/06/airbnb-logo-266x300@2x.png'/>
              </div>
              <div className={styles.ownerInfo}>
                <p>Ivan Ivanov</p>
                <p>{_.get(item, 'sender.name')}</p>
                <p>Joined Tue Nov 26 2019</p>
              </div>
            </div>

          </div>
        ))}
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
