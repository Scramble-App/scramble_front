import React from 'react';
import styles from './App.module.scss'

import companies from './companies'

function App() {
  return (
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
        <h2>Companies list</h2>
        <div className={styles.companiesList}>
          {companies.map(company => (
            <div className={styles.companyCard}>
              {company.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
