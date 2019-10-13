import {all} from "@redux-saga/core/effects";
import {watchFetchUserRequest, watchLoginRequest, watchSignupRequest} from "./auth";
import {watchAddCompanyRequest, watchFetchCompaniesRequest} from "./companies"

export default function* rootSaga() {
  yield all([
    watchFetchUserRequest(),
    watchSignupRequest(),
    watchLoginRequest(),
    watchFetchCompaniesRequest(),
    watchAddCompanyRequest()
  ])
}
