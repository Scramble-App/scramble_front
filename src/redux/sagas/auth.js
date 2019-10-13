import {put, takeEvery, call, takeLatest} from "@redux-saga/core/effects";
import axios from "axios";
import Cookies from 'js-cookie'
import history from '../../history'
import {toast} from "react-toastify";

function* fetchUser () {
  try {
    const res = yield axios.get('http://127.0.0.1:8000/api/auth/users/me/')
    yield put({type: 'FETCH_USER_SUCCESS', payload: res.data})
  } catch (e) {
    yield put({type: 'FETCH_USER_FAILURE'})
  }
}

function* signup ({ payload }) {
  try {
    payload.username = payload.email
    yield axios.post('http://127.0.0.1:8000/api/auth/users/', payload)
    yield call(login, { payload }, 'add-company')
  }
  catch (e) {
    // TODO show notification
  }
}

function* login ({ payload }, redirectUrl = 'companies') {
  try {
    payload.username = payload.email
    const res = yield axios.post('http://127.0.0.1:8000/api/auth/token/login/', payload)
    Cookies.set('token', res.data.auth_token)
    yield call(fetchUser)
    yield call(history.push, redirectUrl)
  }
  catch (e) {
    console.log('herer')
    // TODO show notification
    yield call(toast.error, 'Something went wrong')
  }
}

export function* watchFetchUserRequest () {
  yield takeEvery('FETCH_USER_REQUEST', fetchUser)
}

export function* watchSignupRequest() {
  yield takeLatest('SIGNUP_REQUEST', signup)
}

export function* watchLoginRequest() {
  yield takeLatest('LOGIN_REQUEST', login)
}
