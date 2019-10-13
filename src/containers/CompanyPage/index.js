import React, {useEffect} from 'react'
import styles from './CompanyPage.module.scss'
import {connect} from "react-redux";
import {matchedCompanySelector} from "../../redux/selectors";

const CompanyPage = ({ company, dispatch }) => {
  useEffect(() => {
    // TODO fetch company by id
    dispatch({type: 'FETCH_COMPANIES_REQUEST'})
  }, []);

  return <div className={styles.companyPage}>
    <div>
      <h2>{company.name}</h2>
      {company.description && <p>{company.description}</p>}
      <div>
        {company.updates && company.updates.length &&
          <>
            <p>Monthly updates:</p>
            <ul>
              {company.updates.map(({ date, uploadDate }) => (
                <li key={`${date}_${uploadDate}`}>{(new Date(date)).toDateString()} (uploaded {(new Date(uploadDate)).toDateString()})}</li>
              ))}
            </ul>
          </>
        }
      </div>
    </div>
    <div>
      {company.logo_url &&
      <img
        className={styles.companyLogo}
        src={company.logo_url}
        alt="Logo"
      />
      }

      <div>
        <button>Add to watchlist</button>
        <button>Swap request</button>
      </div>
    </div>
  </div>
};

export default connect(
  (state, props) => ({
    company: matchedCompanySelector(state, props)
  }),
  null
)(CompanyPage)
