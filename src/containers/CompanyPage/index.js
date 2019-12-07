import React, {useEffect} from 'react'
import styles from './CompanyPage.module.scss'
import {connect} from "react-redux";
import {Button, Col, Row, Table} from "antd";
import {companiesListSelector, matchedCompanySelector, ownCompanySelector} from "../../ducks/companies/selectors";
import {matchedOutcomeRequestSelector} from "../../ducks/requests/selectors";
import * as _ from 'lodash'
import {Link} from "react-router-dom";
import listStyles from '../../containers/CompaniesList/CompaniesList.module.scss'


const CompanyPage = ({company, ownCompany, dispatch, outcomeRequest, match, companies}) => {
  useEffect(() => {
    dispatch({type: 'GET_WATCHLISTS_REQUEST'})
    dispatch({type: 'FETCH_COMPANIES_REQUEST'})
    dispatch({type: 'FETCH_COMPANY_REQUEST', payload: {companyId: match.params.companyId}})
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

  const seeAlso = companies
    .filter(c => c.id !== company.id && c.id !== ownCompany.id)
    .slice(0, 2)

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
            {company.id !== ownCompany.id && !outcomeRequest &&
            <Button type="primary" onClick={sendWatchlistRequest}>Add to watchlist</Button>
            }
          </div>
        </div>

        {/*<Button*/}
        {/*  onClick={() => dispatch({type: "ADD_SWAP_REQUEST", payload: {target: parseInt(match.params.companyId, 10)}})}>Send*/}
        {/*  swap</Button>*/}
        {/*<div>*/}
        {/*  {_.get(company, 'updates.length') > 0 &&*/}
        {/*  <>*/}
        {/*    <h4>Monthly updates:</h4>*/}
        {/*    <Table*/}
        {/*      pagination={false}*/}
        {/*      size="middle"*/}
        {/*      columns={[*/}
        {/*        {*/}
        {/*          title: "Update",*/}
        {/*          dataIndex: 'text',*/}
        {/*          key: 'text'*/}
        {/*        },*/}
        {/*        {*/}
        {/*          title: "Date",*/}
        {/*          dataIndex: 'created_at',*/}
        {/*          key: "created_at",*/}
        {/*          render: text => <p className={styles.datetime}>{(new Date(text)).toDateString()}</p>*/}
        {/*        }*/}
        {/*      ]}*/}
        {/*      dataSource={company.updates}*/}
        {/*    />*/}
        {/*  </>*/}
        {/*  }*/}
        {/*</div>*/}
        {seeAlso.length > 0 &&

        <div className={styles.seeAlso}>
          <h3>See also</h3>
          <div className={styles.seeAlsoList}>
            {seeAlso.map(({name, id, founder, logo, created_at}) => (

              <Link to={`/companies/${id}`} key={`${name}_${id}`} className={listStyles.companyCard}>
                <div className={listStyles.logoWrapper}>
                  <img className={listStyles.companyLogo} src={logo}/>
                </div>
                <div className={listStyles.companyInfo}>
                  <p className={listStyles.companyName}>{name}</p>
                  <p className={listStyles.founder}>by {founder}</p>
                  <p className={listStyles.joinDate}>Joined {(new Date(created_at)).toDateString()}</p>
                </div>
              </Link>
            ))}
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
    outcomeRequest: matchedOutcomeRequestSelector(state, props),
    companies: companiesListSelector(state),
  }),
  null
)(CompanyPage)
