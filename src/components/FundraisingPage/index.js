import React, {useEffect} from 'react'
import styles from './FundraisingPage.module.scss'
import {Link} from "react-router-dom";
import {Col, Progress, Row, Tabs} from "antd";
import {connect} from "react-redux";
import {currentUserSelector} from "../../ducks/users/selectors";
import {companySwapsSelector} from "../../ducks/swaps/selectors";

const FundraisingPage = ({dispatch, user, swaps}) => {
  useEffect(() => {
    dispatch({type: 'FETCH_COMPANIES_REQUEST'})
  }, []);
  return (
    <Row>
      {console.log(user.company)}
      <Col offset={4} span={16}>
        <Tabs>
          <Tabs.TabPane tab="Active" key={1}>
            <div className={styles.fundraisingPageWrapper}>
              <div>
                {/* TODO select only active fundraising*/}
                {user.company.fundraising.map(el => (
                  <>
                    {console.log(el.raise_limit / el.raised)}
                    <h2>{new Date(el.start_date).toDateString()} ~ {new Date(el.end_date).toDateString()}</h2>
                    <h3 className={styles.totalAmountHeader}>Total to raise: <span
                      className={styles.totalAmount}>${el.raise_limit}</span></h3>
                    <div className={styles.progressBarWrapper}>
                      <Progress type='circle'
                                format={() => <div className={styles.progressBarText}>${el.raised}
                                  <br/>of <span>${el.raise_limit}</span></div>}
                                percent={el.raise_limit / 100 * el.raised}
                                width={200}
                      />
                    </div>
                    <h3 className={styles.swapsHeader}>
                      Minimum swaps amount: {el.min_swaps_amount}
                    </h3>
                    <div className={styles.swapsCommonWrapper}>
                      <div className={styles.swapsWrapper}>
                        <h3>Successful swaps</h3>
                        {
                          swaps
                            .filter(swap => swap.status === 'accepted')
                            .map(swap => {
                                if (swap.sender.id === user.company.id) {
                                  return <div><Link>{swap.target.name}</Link></div>
                                } else {
                                  return <div><Link>{swap.sender.name}</Link></div>
                                }
                              }
                            )
                        }
                      </div>
                      <div className={styles.swapsWrapper}>
                        <h3>Rejected swaps</h3>
                        {
                          swaps
                            .filter(swap => swap.status === 'declined')
                            .map(swap => {
                                if (swap.sender.id === user.company.id) {
                                  return <Link>{swap.target.name}</Link>
                                } else {
                                  return <Link>{swap.sender.name}</Link>
                                }
                              }
                            )
                        }
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Past" key={2}>
            <div className={styles.fundraisingPageWrapper}>
              Past
            </div>
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  )
}
export default connect(state => ({
  user: currentUserSelector(state),
  swaps: companySwapsSelector(state)
}), null)(FundraisingPage)


