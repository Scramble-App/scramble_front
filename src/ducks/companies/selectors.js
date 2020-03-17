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

export const ownCompanyActiveFundraisingSelector = createSelector(
  [ownCompanySelector],
  company => company.fundraising.find(fund => {
    const today = (new Date()).getTime()
    const startDay = (new Date(fund.start_date)).getTime()
    const endDay = (new Date(fund.end_date)).getTime()

    return today > startDay && today < endDay
  })
)