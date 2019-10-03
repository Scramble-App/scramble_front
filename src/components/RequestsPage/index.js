import React from 'react'
import styles from './RequestsPage.module.scss'
import companies from '../../mockups/companies'
import {Link} from "react-router-dom";

const RequestsPage = () => {
  return (
    <div className={styles.requestsPage}>
      <div>

      <h3>Filters:</h3>
      <ul>
        <li>Watch list</li>
        <li>Swaps</li>
      </ul>
      </div>
<div>
  <div>
    <p>25.09.2019</p>
    <p>Watch list request:</p>
    <p>Company: <Link to={`/companies/${companies[0].id}`}>{companies[0].name}</Link></p>
    <p>Founder: {companies[0].founder}</p>
    <button>Accept</button>
    <button>Decline</button>
  </div>
  <div>
    <p>24.09.2019</p>
    <p>Watch list request:</p>
    <p>Company: <Link to={`/companies/${companies[1].id}`}>{companies[1].name}</Link></p>
    <p>Founder: {companies[1].founder}</p>
    <button>Accept</button>
    <button>Decline</button>
  </div>
</div>
    </div>
  )
};

export default RequestsPage
