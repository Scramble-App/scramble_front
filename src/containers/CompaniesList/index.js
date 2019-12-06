import React, {useEffect} from 'react'
import styles from "./CompaniesList.module.scss";
import {connect} from "react-redux";
import {companiesListSelector} from "../../ducks/companies/selectors";
import {Link} from "react-router-dom";

const CompaniesList = ({dispatch, companies}) => {
  useEffect(() => {
    dispatch({type: 'FETCH_COMPANIES_REQUEST'})
  }, []);

  return (
    <div className={`${styles.wrapper} ${styles.companiesWrapper}`}>
        <h2 className={styles.pageTitle}>Browse companies</h2>
      <div className={styles.companiesList}>
        {/* TODO no companies message and loader */}
        {companies.map(({name, id, created_at, founder, logo}) => (
          <Link to={`/companies/${id}`} key={`${name}_${id}`} className={styles.companyCard}>
            <div className={styles.logoWrapper}>
              <img className={styles.companyLogo} src={logo}/>
            </div>
            <div className={styles.companyInfo}>
               <p className={styles.companyName}>{name}</p>
              <p className={styles.founder}>by {founder}</p>
              <p className={styles.joinDate}>Joined {(new Date(created_at)).toDateString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
};

export default connect(state => ({
  companies: companiesListSelector(state),
}), null)(CompaniesList);
