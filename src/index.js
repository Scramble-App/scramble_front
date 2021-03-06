import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import store from "./store";
import axios from 'axios'
import Cookies from 'js-cookie'
import 'antd/dist/antd.css';
import ReactGA from 'react-ga';

// TODO move to env file
ReactGA.initialize('UA-159394733-1');
ReactGA.pageview(window.location.pathname + window.location.search);

axios.defaults.baseURL = `/api/`;
axios.interceptors.request.use(config => {
  const token = Cookies.get('token')

  if (token) {
    config.headers.Authorization = `Token ${token}`
  }

  return config
})

axios.interceptors.request.use(config => {
  // TODO add trailing slash
  if (config.url.charAt(config.url.length - 1) !== '/') {
    console.warn('Don`t forget about mandatory trailing slash!')
  }

  // if (config.url[config.url.length-1] !== '/') {
  //   config.url += '/';
  // }
  return config;
});


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
