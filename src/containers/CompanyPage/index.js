import React, {useEffect} from 'react'
import styles from './CompanyPage.module.scss'
import {connect} from "react-redux";
import {Button, Col, Row} from "antd";
import {matchedCompanySelector, ownCompanySelector} from "../../ducks/companies/selectors";

const CompanyPage = ({company, ownCompany, dispatch}) => {
  useEffect(() => {
    // TODO fetch company by id
    dispatch({type: 'FETCH_COMPANIES_REQUEST'})
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
      <Col offset={4} span={8}>
        <h2>{company.name}</h2>
        {company.description && <p>{company.description}</p>}
        <div>
          {company.updates && company.updates.length &&
          <>
            <p>Monthly updates:</p>
            <ul>
              {company.updates.map(({date, uploadDate}) => (
                <li key={`${date}_${uploadDate}`}>
                  {(new Date(date)).toDateString()} (uploaded {(new Date(uploadDate)).toDateString()})}
                </li>
              ))}
            </ul>
          </>
          }
        </div>
      </Col>
      <Col span={4}>
        {company.logo_url &&
        <img
          className={styles.companyLogo}
          src={company.logo_url}
          alt="Logo"
        />
        }
        <div>
          <Button onClick={sendWatchlistRequest}>Add to watchlist</Button>
          <Button>Swap request</Button>
        </div>
      </Col>
    </Row>
  )
};

export default connect(
  (state, props) => ({
    company: matchedCompanySelector(state, props),
    ownCompany: ownCompanySelector(state)
  }),
  null
)(CompanyPage)
