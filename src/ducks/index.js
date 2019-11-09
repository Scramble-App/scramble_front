import {all} from "@redux-saga/core/effects";
import {watchFetchUserRequest, watchLoginRequest, watchLogout, watchSignupRequest} from "./users/sagas";
import {combineReducers} from "redux";
import user from './users/reducers'
import companies from "./companies/reducers";
import requests from './requests/reducers'
import updates from './updates/reducers'
import {watchAddCompanyRequest, watchFetchCompaniesRequest, watchFetchCompanyRequest,} from "./companies/sagas";
import {watchGetWatchlistRequestsList, watchSendWatchlistRequest, watchUpdateWatchlistStatus} from "./requests/sagas";
import {watchAddCompanyUpdate, watchFetchCompanyUpdates} from "./updates/saga";

export const propsSelector = (state, props) => props

export function* rootSaga() {
  yield all([
    watchFetchUserRequest(),
    watchSignupRequest(),
    watchLoginRequest(),
    watchFetchCompaniesRequest(),
    watchAddCompanyRequest(),
    watchLogout(),
    watchSendWatchlistRequest(),
    watchGetWatchlistRequestsList(),
    watchUpdateWatchlistStatus(),
    watchFetchCompanyUpdates(),
    watchAddCompanyUpdate(),
    watchFetchCompanyRequest()
  ])
}

export const rootReducer = combineReducers({
  user,
  companies,
  requests,
  updates
})
