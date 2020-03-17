import React, {useCallback, useEffect} from 'react'
import styles from './FundraisingPage.module.scss'
import {Link} from "react-router-dom";
import {Progress} from "antd";
import {connect} from "react-redux";
import {currentUserSelector} from "../../ducks/users/selectors";
import {companySwapsSelector} from "../../ducks/swaps/selectors";
import CompanyCard from "../../components/CompanyCard/CompanyCard";
import Button from "antd/es/button";
import {ownCompanyActiveFundraisingSelector} from "../../ducks/companies/selectors";

const FundraisingPage = ({dispatch, user, swaps, activeFundraising}) => {
  useEffect(() => {
    dispatch({type: 'FETCH_COMPANIES_REQUEST'})
  }, []);

  const incomeSwaps = swaps.filter(swap => swap.status === 'pending' && swap.target.id === user.company.id)
  const outcomeSwaps = swaps.filter(swap => swap.status === 'pending' && swap.sender.id === user.company.id)
  const acceptedSwaps = swaps.filter(swap => swap.status === 'accepted')
  const confirmedSwaps = swaps.filter(swap => swap.status === 'taken')
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
        {
          activeFundraising ?
            <>
              <h2 className={styles.pageTitle}>Active fundraising <span
                className={styles.period}>{new Date(activeFundraising.start_date).toDateString()} - {new Date(activeFundraising.end_date).toDateString()}</span>
              </h2>
              <div className={styles.progressBarWrapper}>
                <Progress type='circle'
                          format={() => <div className={styles.progressBarText}>
                            <span>Raised</span>
                            ${activeFundraising.raised}
                            <br/><span>of ${activeFundraising.initial_raise_limit}</span></div>}
                          percent={activeFundraising.initial_raise_limit / 100 * activeFundraising.raised}
                          width={200}
                />
              </div>
              {activeFundraising.raised !== activeFundraising.initial_raise_limit &&
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
                  <table>
                    <tr>
                      <th>Date</th>
                      <th>Company</th>
                      <th>Partner</th>
                      <th>Swap Amount</th>
                    </tr>

                    {confirmedSwaps.map(swap => {
                      const partner = swap.sender.id === user.company.id ? swap.target : swap.sender

                      return (
                        <tr>
                          <td>{(new Date(swap.created_at)).toDateString()}</td>
                          <td>{partner.name}</td>
                          <td>{partner.founder}</td>
                        </tr>
                      )
                    })
                    }
                  </table>
                  :
                  <p>No confirmed swap requests yet.</p>
                }
              </div>

              <div className={styles.swapsSection}>
                <h2>Accepted swap requests</h2>
                {acceptedSwaps.length ?
                  <table>
                    <tr>
                      <th>Date</th>
                      <th>Company</th>
                      <th>Partner</th>
                    </tr>

                    {acceptedSwaps.map(swap => {
                      const partner = swap.sender.id === user.company.id ? swap.target : swap.sender

                      return (
                        <tr>
                          <td>{(new Date(swap.created_at)).toDateString()}</td>
                          <td>{partner.name}</td>
                          <td>{partner.founder}</td>
                        </tr>
                      )
                    })
                    }
                  </table>
                  :
                  <p>No accepted swap requests yet.</p>
                }
              </div>

              <div className={styles.swapsSection}>
                <h2>Rejected swap requests</h2>
                {rejectedSwaps.length ?
                  <table>
                    <tr>
                      <th>Date</th>
                      <th>Company</th>
                      <th>Partner</th>
                    </tr>

                    {rejectedSwaps.map(swap => {
                      const partner = swap.sender.id === user.company.id ? swap.target : swap.sender

                      return (
                        <tr>
                          <td>{(new Date(swap.created_at)).toDateString()}</td>
                          <td>{partner.name}</td>
                          <td>{partner.founder}</td>
                        </tr>
                      )
                    })
                    }
                  </table>
                  :
                  <p>No rejected swap requests yet.</p>
                }
              </div>
            </>
            :
            <h2 className={styles.pageTitle}>No active fundraising at the moment</h2>
        }

      </div>
    </div>
  )
}

export default connect((state, props) => ({
  user: currentUserSelector(state),
  swaps: companySwapsSelector(state),
  activeFundraising: ownCompanyActiveFundraisingSelector(state, props)
}), null)(FundraisingPage)


