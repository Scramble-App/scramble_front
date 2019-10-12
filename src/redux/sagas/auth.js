import {put, takeEvery, call, takeLatest} from "@redux-saga/core/effects";
import axios from "axios";
import Cookies from 'js-cookie'

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
    // TODO show notification and redirect to login page
  }
  catch (e) {
    // TODO show notification
  }
}

function* login ({ payload }) {
  try {
    payload.username = payload.email
    const res = yield axios.post('http://127.0.0.1:8000/api/auth/token/login/', payload)
    Cookies.set('token', res.data.auth_token)
    yield call(fetchUser)
  }
  catch (e) {

  }
  finally {
    // const response = {
    //   user: {
    //     id: 'someid'
    //   }
    // }
    //
    // yield put({type: 'LOGIN_SUCCESS', payload: response.user })
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
