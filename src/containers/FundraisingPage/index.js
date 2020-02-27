import React, {useCallback, useEffect} from 'react'
import styles from './FundraisingPage.module.scss'
import {Link} from "react-router-dom";
import {Col, Progress, Row, Tabs} from "antd";
import {connect} from "react-redux";
import {currentUserSelector} from "../../ducks/users/selectors";
import {companySwapsSelector} from "../../ducks/swaps/selectors";
import CompanyCard from "../../components/CompanyCard/CompanyCard";
import Button from "antd/es/button";

const FundraisingPage = ({dispatch, user, swaps}) => {
  useEffect(() => {
    dispatch({type: 'FETCH_COMPANIES_REQUEST'})
  }, []);

  // TODO active fundraising https://scrambleup.atlassian.net/browse/SCR-21
  const fundraising = user.company.fundraising[0]

  const incomeSwaps = swaps.filter(swap => swap.status === 'pending' && swap.target.id === user.company.id)
  const outcomeSwaps = swaps.filter(swap => swap.status === 'pending' && swap.sender.id === user.company.id)
  const confirmedSwaps = swaps.filter(swap => swap.status === 'accepted')
  const acceptedSwaps = swaps.filter(swap => swap.status === 'taken')
  const rejectedSwaps = swaps.filter(swap => swap.status === 'declined')


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
    <div className={`${styles.wrapper} ${styles.fundraisingPageWrapper}`}>
      <div>
        <h2 className={styles.pageTitle}>Active fundraising <span
          className={styles.period}>{new Date(fundraising.start_date).toDateString()} - {new Date(fundraising.end_date).toDateString()}</span>
        </h2>
        <div className={styles.progressBarWrapper}>
          <Progress type='circle'
                    format={() => <div className={styles.progressBarText}>
                      <span>Raised</span>
                      ${fundraising.raised}
                      <br/><span>of ${fundraising.initial_raise_limit}</span></div>}
                    percent={fundraising.initial_raise_limit / 100 * fundraising.raised}
                    width={200}
          />
        </div>
        {fundraising.raised !== fundraising.initial_raise_limit &&
        <div style={{marginTop: 40}}>
          <h3>Not enough?</h3>
          <p>Try to <Link to="/companies">browse companies</Link> and send few more swap requests</p>
        </div>
        }

        <div className={styles.swapsSection}>
          <h2>Income swap requests</h2>
          {incomeSwaps.length ?
            <>{
              incomeSwaps.map(swap => (
                <div className={styles.swapCard}>
                  <CompanyCard company={swap.sender}/>
                    <Button onClick={() => reject(swap)} className={styles.rejectButton}>Reject</Button>
                    <Button onClick={() => approve(swap)} type={"primary"}>Accept</Button>
                </div>
              ))
            }
            </>
            :
            <p>No incoming swap requests yet.</p>
          }
        </div>

        <div className={styles.swapsSection}>
          <h2>Outcome swap requests</h2>
          {outcomeSwaps.length ?
            <>{
              outcomeSwaps.map(swap => (
                <div className={styles.swapCard}>
                  <CompanyCard company={swap.target}/>
                </div>
              ))
            }
            </>
            :
            <p>No outcoming swap requests yet.</p>
          }
        </div>

        <div className={styles.swapsSection}>
          <h2>Confirmed swap requests</h2>
          {confirmedSwaps.length ?
            <>{
              confirmedSwaps.map(swap => (
                <div className={styles.swapCard}>
                  <CompanyCard company={swap.target}/>
                </div>
              ))
            }
            </>
            :
            <p>No confirmed swap requests yet.</p>
          }
        </div>
      </div>
    </div>
  )
}
export default connect(state => ({
  user: currentUserSelector(state),
  swaps: companySwapsSelector(state)
}), null)(FundraisingPage)


