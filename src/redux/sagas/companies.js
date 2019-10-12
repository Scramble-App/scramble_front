import {put, takeEvery} from "@redux-saga/core/effects";
import companiesMockups from '../../mockups/companies'

function* fetchCompaniesRequest () {
  try {
    // const res = yield axios.get('../../mockups/companies.json')

    yield put({type: 'FETCH_COMPANIES_SUCCESS', payload: companiesMockups})
  } catch (e) {
    //TODO
    // yield put({type: 'FETCH_COMPANIES_FAILURE'})
  }
}

export function* watchFetchCompaniesRequest () {
  yield takeEvery('FETCH_COMPANIES_REQUEST', fetchCompaniesRequest)
}
