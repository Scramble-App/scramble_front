import React from 'react'
import styles from './FundraisingPage.module.scss'
import companies from '../../mockups/companies'
import {Link} from "react-router-dom";
import {Col, Progress, Row, Tabs} from "antd";
import {connect} from "react-redux";
import {currentUserSelector} from "../../ducks/users/selectors";
import {swapsSelector} from "../../ducks/swaps/selectors";

const FundraisingPage = ({user}) => (
  <Row>
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
                              format={() => `$${el.raised}`}
                              percent={el.raise_limit / 100 * el.raised}
                    />
                  </div>
                  <p className={styles.raisedAmountText}>Already raised: ${el.raised} of ${el.raise_limit}</p>

                  <h3 className={styles.swapsHeader}>
                    Minimum swaps amount: {el.min_swaps_amount}
                  </h3>
                  <div className={styles.swapsWrapper}>
                  <div>
                  <h3>Successful swaps</h3>
                  <p><Link to={`/companies/${companies[0].id}`}>{companies[0].name}</Link>: <span>$2 000</span></p>
                  <p><Link to={`/companies/${companies[1].id}`}>{companies[1].name}</Link>: <span>$700</span></p>
                  </div>
                  <div>
                    <h3>Rejected swaps</h3>
                  <p><Link to={`/companies/${companies[2].id}`}>{companies[2].name}</Link></p>
                  <p><Link to={`/companies/${companies[3].id}`}>{companies[3].name}</Link></p>
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
export default connect(state => ({
  user: currentUserSelector(state),
}), null)(FundraisingPage)


