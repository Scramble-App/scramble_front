import React from 'react'
import styles from './FundraisingPage.module.scss'
import companies from '../../mockups/companies'
import {Link} from "react-router-dom";

const FundraisingPage = () => {
  return (

    <div className={styles.fundraisingPage}>
      <div>
        <h3>Months:</h3>
        <ul>
          <li>Sep 2019</li>
          <li>Aug 2019</li>
          <li>Jul 2019</li>
        </ul>
      </div>
      <div>
        <h3>September 2019</h3>
        <p>Total to raise: <span>$25 000</span></p>
        <p>Max: <span>$25 000</span></p>
        <p>Already raised: <span>$12 000</span></p>

        <h4>Successfull swaps</h4>
        <p><Link to={`/companies/${companies[0].id}`}>{companies[0].name}</Link>: <span>$2 000</span></p>
        <p><Link to={`/companies/${companies[1].id}`}>{companies[1].name}</Link>: <span>$700</span></p>

        <h4>Rejected swaps</h4>
        <p><Link to={`/companies/${companies[2].id}`}>{companies[2].name}</Link></p>
        <p><Link to={`/companies/${companies[3].id}`}>{companies[3].name}</Link></p>
      </div>
    </div>
  )
}

export default FundraisingPage
