import React, {useEffect} from 'react'
import styles from "./CompaniesList.module.scss";
import {connect} from "react-redux";
import {companiesListSelector} from "../../ducks/companies/selectors";
import {Link} from "react-router-dom";
import CompanyCard from "../../components/CompanyCard/CompanyCard";

const CompaniesList = ({dispatch, companies}) => {
  useEffect(() => {
    dispatch({type: 'FETCH_COMPANIES_REQUEST'})
  }, []);

  return (
    <div className={`${styles.wrapper} ${styles.companiesWrapper}`}>
      <h2 className={styles.pageTitle}>Browse companies</h2>
      <div className={styles.companiesList}>
        {/* TODO no companies message and loader */}
        {companies.map(company => <CompanyCard company={company} />)}
      </div>
    </div>
  )
};

export default connect(state => ({
  companies: companiesListSelector(state),
}), null)(CompaniesList);
