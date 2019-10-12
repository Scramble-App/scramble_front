import React, {useEffect} from 'react';
import {Redirect, Route, BrowserRouter as Router, Switch} from "react-router-dom";
import CompaniesList from "./containers/CompaniesList";
import CompanyPage from "./components/CompanyPage";
import FundraisingPage from "./components/FundraisingPage";
import RequestsPage from "./components/RequestsPage";
import {connect} from "react-redux";
import Signup from "./components/Signup";
import {authOnly, unauthOnly} from "./auth";
import Login from "./components/Login";

function App({ dispatch }) {
  useEffect((...props) => {
    dispatch({type: 'FETCH_USER_REQUEST'})
  })

  const signup = (values) => {
    dispatch({type: 'SIGNUP_REQUEST', payload: values})
  }

  const login = (values) => {
    dispatch({type: 'LOGIN_REQUEST', payload: values})
  }

  return (
    <Router>
      <Switch>
        <Route
          path="/signup"
          component={unauthOnly(() => <Signup onSignupFormSubmit={signup} />)}
        />
        <Route
          path="/login"
          component={unauthOnly(() => <Login onLoginFormSubmit={login} />)}
        />
        <Route
          path="/companies"
          exact
          component={authOnly(CompaniesList)}
        />
        <Route
          path="/companies/:id"
          component={authOnly(CompanyPage)}
        />
        <Route
          path="/fundraising"
          component={authOnly(FundraisingPage)}
        />
        <Route
          path="/requests"
          component={authOnly(RequestsPage)}
        />
        <Redirect
          to="/login"
        />
      </Switch>
    </Router>
  );
}

export default connect(null, null)(App);
