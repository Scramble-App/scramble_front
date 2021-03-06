import axios from "axios"
import {put, takeEvery, call} from "@redux-saga/core/effects";
import {notification} from "antd";
import {fetchUser} from "../users/sagas";
import {normalize} from "normalizr";
import {swap} from "../schema";
import * as _ from 'lodash'

function* sendSwapRequest(action) {
  try {
    yield axios.post('/swaps/', action.payload)
    yield put({type: 'ADD_SWAP_SUCCESS'})
    yield put({type: 'FETCH_USER_REQUEST'})
    notification.success({message: 'Your swap request has been sent!'})
  } catch (e) {
    const error = _.get(e, 'response.data[0]')
    if (error) {
      notification.error({message: error})
    } else {
      notification.error({message: 'Something went wrong. Please try again!'})
    }
  }
}

function* fetchSwapsRequest() {
  try {
    const res = yield axios.get('/swaps/')

    const normalizedData = normalize(res.data, [swap])
    console.log(normalizedData)
    yield put({type: 'FETCH_SWAPS_SUCCESS', payload: res.data})
  } catch (e) {
    notification.error({message: 'Something went wrong. Please try again!'})
  }
}

function* updateSwapRequest({payload}) {
  try {
    const res = yield axios.patch(`/swaps/${payload.id}/`, payload)
    yield put({type: 'UPDATE_SWAP_SUCCESS', payload: res.data})
    notification.success({message: `You've successfully ${payload.status === 'accepted' ? 'accepted' : 'declined'} swap request!`})
    // refresh own swaps
    yield call(fetchUser)
  } catch (e) {
    notification.error({message: 'Something went wrong. Please try again!'})
  }
}

export function* watchSendSwapRequest() {
  yield takeEvery("ADD_SWAP_REQUEST", sendSwapRequest)
}

export function* watchFetchSwapRequest() {
  yield takeEvery("FETCH_SWAPS_REQUEST", fetchSwapsRequest)
}

export function* watchUpdateSwapRequest() {
  yield takeEvery("UPDATE_SWAP_REQUEST", updateSwapRequest)
}
