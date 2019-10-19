import React, {useEffect} from 'react';
import {Link, Redirect, Route, Router, Switch} from "react-router-dom";
import CompaniesList from "./containers/CompaniesList";
import CompanyPage from "./containers/CompanyPage";
import FundraisingPage from "./components/FundraisingPage";
import RequestsPage from "./components/RequestsPage";
import {connect} from "react-redux";
import Signup from "./components/Signup";
import AddCompany from "./components/AddCompany";
import {authOnly, unauthOnly} from "./auth";
import Login from "./components/Login";
import Account from "./containers/Account";
import history from "./history"
import {Layout, Menu} from "antd";
import styles from './App.module.scss'

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
      <Layout>
        <Layout.Header>
          <div className={styles.logo}>
            <Link to="/">
              Scramble
            </Link>
          </div>
          <Menu
            mode="horizontal"
            theme="dark"
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key={1}>
              <Link to="/companies">Companies</Link>
            </Menu.Item>
            <Menu.Item key={2}>
              <Link to="/my-company">My Company</Link>
            </Menu.Item>

            <Menu.Item key={3}>
              <Link to="/account">My Account</Link>
            </Menu.Item>
          </Menu>
        </Layout.Header>
        <Layout.Content className={styles.content}>
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
            <Route
              path="/account"
              component={authOnly(Account)}
            />
            <Redirect
              to="/login"
            />
          </Switch>
        </Layout.Content>
      </Layout>
    </Router>
  );
}

export default connect(null, null)(App);
