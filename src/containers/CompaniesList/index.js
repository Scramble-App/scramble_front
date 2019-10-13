import React, {useEffect} from 'react'
import styles from "./CompaniesList.module.scss";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {companiesListSelector} from "../../redux/selectors";

const CompaniesList = ({dispatch, companies}) => {
  useEffect(() => {
    dispatch({type: 'FETCH_COMPANIES_REQUEST'})
  }, []);

  return (
  //  TODO move to component view
  <div className={styles.wrapper}>
    <div>
      <h3>Filters</h3>
      <ul>
        <li>profitable</li>
        <li>has black Jack</li>
      </ul>
      <button>All</button>
      <button>Watchlist</button>
      <div>
        <h3>Other pages:</h3>
        <div>
          <Link to="/fundraising">Fundraising</Link>
        </div>
        <div>
          <Link to="/requests">Requests</Link>
        </div>
        <div>
          <Link to="/add-company">Add company</Link>
        </div>
      </div>
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
        {companies.map(({name, id}) => (
          <div key={`${name}_${id}`} className={styles.companyCard}>
            <Link to={`/companies/${id}`}>
              {name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>
)};

export default connect(state => ({
  companies: companiesListSelector(state),
}), null)(CompaniesList);
