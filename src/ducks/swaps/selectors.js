import {createSelector} from "reselect";
import {companiesListSelector, ownCompanyActiveFundraisingSelector, ownCompanySelector} from "../companies/selectors";

export const swapsSelector = state => state.swaps

export const companySwapsSelector = createSelector(
  [companiesListSelector, ownCompanyActiveFundraisingSelector],
  (companies, activeFundraising) => {
    if (!activeFundraising) return []

    return (
      activeFundraising.swaps
        .map(swap => ({
          ...swap,
          sender: companies.find(company => company.id === swap.sender) || {},
          target: companies.find(company => company.id === swap.target) || {}
        }))
    )
  }
)

// TODO might need to change to ownSwaps only?
export const outcomeSwapsSelector = createSelector(
  [companySwapsSelector, companiesListSelector, ownCompanySelector],
  (swaps, companies, ownCompany) => (
    swaps
      .filter(swap => swap.sender.id === ownCompany.id)
      .map((swap) => ({
        ...swap,
        subtype: 'outcome'
      }))
  )
)

export const incomeSwapsSelector = createSelector(
  [companySwapsSelector, companiesListSelector, ownCompanySelector],
  (swaps, companies, ownCompany) => (
    swaps
      .filter(swap => swap.target.id === ownCompany.id)
      .map((swap) => ({
        ...swap,
        subtype: 'income'
      }))
  )
)

