import {createSelector} from "reselect";
import {companiesListSelector, ownCompanySelector} from "../companies/selectors";

export const requestsSelector = state => state.requests
export const outcomeRequestsSelector = createSelector(
  [requestsSelector, companiesListSelector, ownCompanySelector],
  (requests, companies, myCompany) => (
    requests
      .filter(request => request.sender === myCompany.id)
      .map((request) => ({
        ...request,
        sender: companies.find(company => company.id === request.sender),
        target: companies.find(company => company.id === request.target)
      }))
  )
)

export const incomeRequestsSelector = createSelector(
  [requestsSelector, companiesListSelector, ownCompanySelector],
  (requests, companies, myCompany) =>
    requests
      .filter(request => request.target === myCompany.id)
      .map((request) => ({
        ...request,
        sender: companies.find(company => company.id === request.sender),
        target: companies.find(company => company.id === request.target)
      }))
)
