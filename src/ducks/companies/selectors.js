import {createSelector} from "reselect";
import {propsSelector} from "../index";
import {currentUserSelector} from "../users/selectors";

export const companiesListSelector = state => state.companies
export const matchedCompanySelector = createSelector(
  [companiesListSelector, propsSelector],
  (companies, { match }) => companies.find(company => company.id === parseInt(match.params.id, 10)) || {}
)
export const ownCompanySelector = createSelector(
  [companiesListSelector, currentUserSelector],
  (companies, user) => companies.find(company => company.founder === user.id) || {}
)
