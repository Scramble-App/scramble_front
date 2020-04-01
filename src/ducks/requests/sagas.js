import axios from "axios";
import {put, takeEvery, takeLatest} from "@redux-saga/core/effects";
import {notification} from "antd";

function* sendWatchlistRequest({ payload }) {
  try {
    const res = yield axios.post('request/', payload)
    yield put({type: 'ADD_WATCHLIST_SUCCESS', payload: res.data})
    notification.success({message: 'Your request has been sent!'})
  } catch (e) {
    notification.error({message: 'Something went wrong. Please try again!'})
  }
}
function* updateWatchlistStatus ({payload}) {
  try {
    yield axios.patch(`request/${payload.id}/`, payload)
    yield put({type: 'UPDATE_WATCHLIST_SUCCESS', payload})
    yield put({type: 'FETCH_USER_REQUEST'})
    notification.success({message: `You've successfully ${payload.status === 'accepted' ? 'accepted' : 'declined'} request!`})
  } catch (e) {
    notification.error({message: 'Something went wrong. Please try again!'})
  }
}

function* fetchWatchlistRequests() {
  try {
  const res = yield axios.get('request/')
  yield put({type: 'GET_WATCHLIST_SUCCESS', payload: res.data})
  } catch (e) {
    notification.error({message: 'Something went wrong. Please try again!'})
  }
}

export function* watchSendWatchlistRequest() {
  yield takeEvery('SEND_WATCHLIST_REQUEST_REQUEST', sendWatchlistRequest)
}

export function* watchGetWatchlistRequestsList() {
  yield takeLatest('GET_WATCHLISTS_REQUEST', fetchWatchlistRequests)
}
export function* watchUpdateWatchlistStatus() {
  yield takeLatest('UPDATE_WATCHLIST_REQUEST', updateWatchlistStatus)
}
