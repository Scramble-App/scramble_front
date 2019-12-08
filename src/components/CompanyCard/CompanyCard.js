import React from 'react';
import styles from "../../containers/CompaniesList/CompaniesList.module.scss";
import {Link} from "react-router-dom";

const CompanyCard = ({company: {id, name, founder, logo, created_at} = {}}) => {
  return (
    <Link to={`/companies/${id}`} key={`${name}_${id}`} className={styles.companyCard}>
      <div className={styles.logoWrapper}>
        <img className={styles.companyLogo} src={logo} alt="Company logo" />
      </div>
      <div className={styles.companyInfo}>
        <p className={styles.companyName}>{name}</p>
        <p className={styles.founder}>by {founder}</p>
        <p className={styles.joinDate}>Joined {(new Date(created_at)).toDateString()}</p>
      </div>
    </Link>
  );
};

export default CompanyCard;