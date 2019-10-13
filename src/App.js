import React, {useEffect} from 'react';
import {Redirect, Route, Router, Switch} from "react-router-dom";
import CompaniesList from "./containers/CompaniesList";
import CompanyPage from "./containers/CompanyPage";
import FundraisingPage from "./components/FundraisingPage";
import RequestsPage from "./components/RequestsPage";
import {connect} from "react-redux";
import Signup from "./components/Signup";
import AddCompany from "./components/AddCompany";
import {authOnly, unauthOnly} from "./auth";
import Login from "./components/Login";
import history from "./history"

function App({dispatch}) {
  useEffect((...props) => {
    dispatch({type: 'FETCH_USER_REQUEST'})
  })

  const signup = (values) => {
    dispatch({type: 'SIGNUP_REQUEST', payload: values})
  }

  const login = (values) => {
    dispatch({type: 'LOGIN_REQUEST', payload: values})
  }

  const addCompany = (values) => {
    dispatch({type: 'ADD_COMPANY_REQUEST', payload: values})
  }

  return (
    <Router history={history}>
      <Switch>
        <Route
          path="/signup"
          component={unauthOnly(props => <Signup onSignupFormSubmit={signup} {...props}/>)}
        />
        <Route
          path="/login"
          component={unauthOnly(props => <Login onLoginFormSubmit={login} {...props}/>)}
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
        <Route
          path="/add-company"
          component={authOnly(props => <AddCompany onAddCompanyFormSubmit={addCompany} {...props} />)}
        />
        <Redirect
          to="/login"
        />
      </Switch>
    </Router>
  );
}

export default connect(null, null)(App);
