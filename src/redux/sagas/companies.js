import {put, takeEvery} from "@redux-saga/core/effects";
import axios from "axios";

function* fetchCompaniesRequest() {
  try {
    const res = yield axios.get('company/')

    yield put({type: 'FETCH_COMPANIES_SUCCESS', payload: res.data})
  } catch (e) {
    //TODO
    // yield put({type: 'FETCH_COMPANIES_FAILURE'})
  }
}

function* addCompanyRequest(action) {
  try {
    const res = yield axios.post('company/', action.payload)
    yield put({type: 'FETCH_ADD_COMPANIES_SUCCESS', payload: res.data})
  } catch (e) {
    //TODO
    // yield put({type: 'FETCH_COMPANIES_FAILURE'})
  }

}
export function* watchAddCompanyRequest()  {
  yield takeEvery('ADD_COMPANY_REQUEST', addCompanyRequest)
}
export function* watchFetchCompaniesRequest() {
  yield takeEvery('FETCH_COMPANIES_REQUEST', fetchCompaniesRequest)
}
