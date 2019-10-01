import React from 'react'
import styles from "./CompaniesList.module.scss";
import companies from "../../mockups/companies";
import {Link} from "react-router-dom";

const CompaniesList = () => (
  <div className={styles.wrapper}>
    <div>
      <h3>Filters</h3>
      <ul>
        <li>profitable</li>
        <li>has black Jack</li>
      </ul>
      <button>All</button>
      <button>Watchlist</button>
    </div>
    <div>
      <div className={styles.subHeader}>
        <h2>Companies list</h2>
        <div>
          <button>List view</button>
          <button>Add company</button>
        </div>
      </div>
      <div className={styles.companiesList}>
        {companies.map(({ name, id }) => (
          <div key={`${name}_${id}`} className={styles.companyCard}>
            <Link to={`/companies/${id}`}>
              {name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default CompaniesList;
