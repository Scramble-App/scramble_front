import {createSelector} from "reselect";
import {companiesListSelector, ownCompanySelector} from "../companies/selectors";

// TODO fix type hardcode
export const swapsSelector = state => state.swaps.map(swap => ({...swap, type: 'swap'}))
export const outcomeSwapsSelector = createSelector(
  [swapsSelector, companiesListSelector, ownCompanySelector],
  (swaps, companies, ownCompany) => (
    swaps
      .filter(swap => swap.sender === ownCompany.id)
      .map((swap) => ({
        ...swap,
        sender: companies.find(company => company.id === swap.sender),
        target: companies.find(company => company.id === swap.target)
      }))
  )
)

export const incomeSwapsSelector = createSelector(
  [swapsSelector, companiesListSelector, ownCompanySelector],
  (swaps, companies, ownCompany) => (
    swaps
      .filter(swap => swap.target === ownCompany.id)
      .map((swap) => ({
        ...swap,
        sender: companies.find(company => company.id === swap.sender),
        target: companies.find(company => company.id === swap.target)
      }))
  )
)

export const companySwapsSelector = createSelector(
  [ownCompanySelector, companiesListSelector],
  (ownCompany, companies) => (
    ownCompany.fundraising[0].swaps
      .map(swap => ({
        ...swap,
        sender: companies.find(company => company.id === swap.sender) || {},
        target: companies.find(company => company.id === swap.target) || {}
      }))
  )
)
