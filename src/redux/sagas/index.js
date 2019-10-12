import {all} from "@redux-saga/core/effects";
import {watchFetchUserRequest, watchLoginRequest, watchSignupRequest} from "./auth";
import {watchFetchCompaniesRequest} from "./companies"

export default function* rootSaga() {
  yield all([
    watchFetchUserRequest(),
    watchSignupRequest(),
    watchLoginRequest(),
    watchFetchCompaniesRequest()
  ])
}
