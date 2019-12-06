import {createSelector} from "reselect";
import {propsSelector} from "../index";
import {currentUserSelector} from "../users/selectors";

export const companiesListSelector = state => state.companies || []
export const matchedCompanySelector = createSelector(
  [companiesListSelector, propsSelector],
  (companies, { match }) => companies.find(company => company.id === parseInt(match.params.companyId, 10)) || {}
)
export const ownCompanySelector = createSelector(
  [currentUserSelector],
  user => user.company || {}
)
