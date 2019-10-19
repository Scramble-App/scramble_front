import {createSelector} from "reselect";

export const propsSelector = (state, props) => props
export const companiesListSelector = state => state.companies
export const currentUserSelector = state => state.user
export const matchedCompanySelector = createSelector(
  [companiesListSelector, propsSelector],
  (companies, { match }) => companies.find(company => company.id === parseInt(match.params.id, 10)) || {}
)
