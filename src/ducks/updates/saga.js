import axios from "axios";
import {put, takeEvery} from "@redux-saga/core/effects";
import {notification} from "antd";


function* fetchCompanyUpdates () {
  try {
    const res = yield axios.get('/update/')
    yield put({type: 'FETCH_UPDATES_SUCCESS', payload: res.data})
  } catch (e) {
    notification.error({message: 'Something went wrong. Please try again!'})
  }
}
function* addCompanyUpdate (action) {
  try {
    const res = yield axios.post('/update/', action.payload)
    yield put({type: 'ADD_UPDATE_SUCCESS', payload: res.data})
    notification.success({message: `You've successfully added company update!`})
  } catch (e) {
    notification.error({message: 'Something went wrong. Please try again!'})
  }
}
export function* watchAddCompanyUpdate () {
  yield takeEvery('ADD_UPDATE_REQUEST', addCompanyUpdate)
}
export function* watchFetchCompanyUpdates() {
  yield takeEvery('FETCH_UPDATES_REQUEST', fetchCompanyUpdates)
}
