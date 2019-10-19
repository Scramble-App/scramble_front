import axios from "axios";
import {put, takeEvery, takeLatest} from "@redux-saga/core/effects";
import {notification} from "antd";

function* sendWatchlistRequest({ payload, resolve, reject }) {
  try {
    yield axios.post('request/', payload)
    resolve()
    notification.success({message: 'You\'r request has been sent!'})
  } catch (e) {

  }
}

function* fetchWatchlistRequests() {
  const res = yield axios.get('request/')
  yield put({type: 'GET_WATCHLIST_SUCCESS', payload: res.data})
}

export function* watchSendWatchlistRequest() {
  yield takeEvery('SEND_WATCHLIST_REQUEST_REQUEST', sendWatchlistRequest)
}

export function* watchGetWatchlistRequestsList() {
  yield takeLatest('GET_WATCHLISTS_REQUEST', fetchWatchlistRequests)
}
