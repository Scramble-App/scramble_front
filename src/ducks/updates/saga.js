import axios from "axios";
import {call, put, takeEvery} from "@redux-saga/core/effects";


function* fetchCompanyUpdates () {
  try {
    const res = yield axios.get('/update/')
    yield put({type: 'FETCH_UPDATES_SUCCESS', payload: res.data})
  } catch (e) {
    //TODO
    // put({type: 'FETCH_UPDATES_SUCCESS'})
  }
}
function* addCompanyUpdate (action) {
  try {
    const res = yield axios.post('/update/', action.payload)
    yield put({type: 'ADD_UPDATE_SUCCESS', payload: res.data})
  } catch (e) {
    console.log(e)
    //TODO
    // put({type: 'ADD_UPDATE_SUCCESS'})
  }
}
export function* watchAddCompanyUpdate () {
  yield takeEvery('ADD_UPDATE_REQUEST', addCompanyUpdate)
}
export function* watchFetchCompanyUpdates() {
  yield takeEvery('FETCH_UPDATES_REQUEST', fetchCompanyUpdates)
}
