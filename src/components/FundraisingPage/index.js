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

  // TODO active fundraising
  const el = user.company.fundraising[0]

  return (
    <div className={`${styles.wrapper} ${styles.fundraisingPageWrapper}`}>
      <div>
        <h2 className={styles.pageTitle}>Active fundraising <span
          className={styles.period}>{new Date(el.start_date).toDateString()} - {new Date(el.end_date).toDateString()}</span>
        </h2>
        <div className={styles.progressBarWrapper}>
          <Progress type='circle'
                    format={() => <div className={styles.progressBarText}>
                      <span>Raised</span>
                      ${el.raised}
                      <br/><span>of ${el.initial_raise_limit}</span></div>}
                    percent={el.initial_raise_limit / 100 * el.raised}
                    width={200}
          />
        </div>
        {el.raised !== el.initial_raise_limit &&
        <div style={{marginTop: 40}}>
          <h3>Not enough?</h3>
          <p>Try to <Link to="/companies">browse companies</Link> and send few more swap requests</p>
        </div>
        }
      </div>
    </div>
  )
}
export default connect(state => ({
  user: currentUserSelector(state),
  swaps: companySwapsSelector(state)
}), null)(FundraisingPage)


