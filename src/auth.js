import {connectedRouterRedirect} from "redux-auth-wrapper/history4/redirect";

const authorizedUserCriteria = {
  authenticatedSelector: state => !!state.user.id,
  authenticatingSelector: state => !!state.user.isLoading,
}

const unauthorizedUserCriteria = {
  authenticatedSelector: state => !state.user.id && !state.user.isLoading,
  authenticatingSelector: state => !!state.user.isLoading,
}

const withoutCompanyCriteria = {
  authenticatedSelector: state => !state.user.company && !state.user.isLoading,
  authenticatingSelector: state => !!state.user.isLoading,
}

const withCompanyCriteria = {
  authenticatedSelector: state => !!state.user.company,
  authenticatingSelector: state => !!state.user.isLoading,
}

export const authOnly =
  connectedRouterRedirect({
    ...authorizedUserCriteria,
    redirectPath: '/login'
  })

export const unauthOnly =
  connectedRouterRedirect({
    ...unauthorizedUserCriteria,
    redirectPath: '/companies'
  })

export const withoutCompany =
  connectedRouterRedirect({
    ...withoutCompanyCriteria,
    redirectPath: '/companies'
  })

export const withCompany =
  connectedRouterRedirect({
    ...withCompanyCriteria,
    redirectPath: '/add-company'
  })
