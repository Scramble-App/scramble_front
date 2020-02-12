import axios from "axios";
import {call, put, take, takeEvery} from "@redux-saga/core/effects";
import history from "../../history";
import {notification} from "antd";

function* fetchCompaniesRequest() {
  try {
    const res = yield axios.get('company/')

    yield put({type: 'FETCH_COMPANIES_SUCCESS', payload: res.data})
  } catch (e) {
    notification.error({message: 'Something went wrong. Please try again!'})
  }
}

function* addCompanyRequest(action) {
  try {
    const res = yield axios.post('company/', action.payload)
    yield put({type: 'FETCH_ADD_COMPANIES_SUCCESS', payload: res.data})
    yield put({type: 'FETCH_USER_REQUEST'})
    yield call(history.push, '/companies')
  } catch (e) {
    notification.error({message: 'Something went wrong. Please try again!'})
  }
}

function* fetchCompanyRequest(action) {
  try {
    yield take('FETCH_COMPANIES_SUCCESS')
    const res = yield axios.get(`company/${action.payload.companyId}/`)
    yield put({type: 'FETCH_COMPANY_SUCCESS', payload: res.data})
  } catch (e) {
    notification.error({message: 'Something went wrong. Please try again!'})
  }
}

export function* watchAddCompanyRequest()  {
  yield takeEvery('ADD_COMPANY_REQUEST', addCompanyRequest)
}
export function* watchFetchCompaniesRequest() {
  yield takeEvery('FETCH_COMPANIES_REQUEST', fetchCompaniesRequest)
}
export function* watchFetchCompanyRequest() {
  yield takeEvery('FETCH_COMPANY_REQUEST', fetchCompanyRequest)
}
