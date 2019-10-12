import {connectedRouterRedirect} from "redux-auth-wrapper/history4/redirect";

const authorizedUserCriteria = {
  authenticatedSelector: state => !!state.user.id,
  authenticatingSelector: state => !!state.user.isLoading,
}

const unauthorizedUserCriteria = {
  authenticatedSelector: state => !state.user.id && !state.user.isLoading,
  authenticatingSelector: state => !!state.user.isLoading,
}

export const authOnly =
  connectedRouterRedirect({
    ...authorizedUserCriteria,
    redirectPath: '/signup'
  })

export const unauthOnly =
  connectedRouterRedirect({
    ...unauthorizedUserCriteria,
    redirectPath: '/companies'
  })
