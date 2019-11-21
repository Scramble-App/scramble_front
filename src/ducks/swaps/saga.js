import axios from "axios"
import {call, put, takeEvery} from "@redux-saga/core/effects";

function* sendSwapRequest(action) {
  try {
    const res = yield axios.post('/swaps/', action.payload)
    yield put({type: 'ADD_SWAP_SUCCESS'})
  } catch (e) {
    //TODO
    // yield({type: "ADD_SWAP_FAILURE"})
  }
}

function* fetchSwapsRequest() {
  try {
    const res = yield axios.get('/swaps/')
    yield put({type: 'FETCH_SWAPS_SUCCESS', payload: res.data})
  } catch (e) {
    //TODO
    // yield({type: "FETCH_SWAP_FAILURE"})
  }
}

// function* updateSwapRequest() {
//
//
// }

export function* watchSendSwapRequest() {
  yield takeEvery("ADD_SWAP_REQUEST", sendSwapRequest)
}
export function* watchFetchSwapRequest() {
  yield takeEvery("FETCH_SWAPS_REQUEST", fetchSwapsRequest)

}
