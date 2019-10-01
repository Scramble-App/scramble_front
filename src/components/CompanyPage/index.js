import React from 'react'
import companies from '../../mockups/companies'
import styles from './CompanyPage.module.scss'

const CompanyPage = ({match}) => {
  const companyId = parseInt(match.params.id, 10)
  const companyData = companies.find(company => company.id === companyId)

  return <div className={styles.companyPage}>
    <div>
      <h2>{companyData.name}</h2>
      {companyData.description && <p>{companyData.description}</p>}
      <div>
        {companyData.updates && companyData.updates.length &&
          <>
            <p>Monthly updates:</p>
            <ul>
              {companyData.updates.map(({ date, uploadDate }) => (
                <li key={`${date}_${uploadDate}`}>{(new Date(date)).toDateString()} (uploaded {(new Date(uploadDate)).toDateString()})}</li>
              ))}
            </ul>
          </>
        }
      </div>
    </div>
    <div>
      {companyData.logoUrl &&
      <img
        className={styles.companyLogo}
        src={companyData.logoUrl}
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

export default CompanyPage
