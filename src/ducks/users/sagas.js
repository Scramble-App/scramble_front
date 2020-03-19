import axios from "axios";
import {call, put, takeEvery, takeLatest} from "@redux-saga/core/effects";
import Cookies from "js-cookie";
import history from "../../history";
import {notification} from "antd";

export function* fetchUser () {
  try {
    const res = yield axios.get('auth/users/me/')
    yield put({type: 'FETCH_USER_SUCCESS', payload: res.data})
  } catch (e) {
    Cookies.remove('token')
    yield put({type: 'FETCH_USER_FAILURE'})
  }
}

function* signup ({ payload }) {
  try {
    payload.username = payload.email
    yield axios.post('auth/users/', payload)
    yield call(login, { payload }, 'add-company')
  }
  catch (e) {
    notification.error({message: 'Something went wrong. Please try again!'})
  }
}

function* login ({ payload }, redirectUrl = 'companies') {
  try {
    payload.username = payload.email
    const res = yield axios.post('auth/token/login/', payload)
    Cookies.set('token', res.data.auth_token)
    yield put({type: 'LOGIN_SUCCESS'})
    yield call(fetchUser)
    yield call(history.push, redirectUrl)
  }
  catch (e) {
    yield put({type: 'LOGIN_FAILURE'})
    notification.error({message: 'Something went wrong. Please try again!'})
  }
}

function* logout() {
  try {
    yield axios.post('auth/token/logout/')
    Cookies.remove('token')
    yield put({ type: 'LOGOUT_SUCCESS'})
  }
  catch (e) {
    yield put({ type: 'LOGOUT_FAILURE'})
    notification.error({message: 'Something went wrong. Please try again!'})
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

export function* watchLogout() {
  yield takeLatest('LOGOUT_REQUEST', logout)
}
