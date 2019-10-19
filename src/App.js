import React, {useEffect} from 'react';
import {Link, Redirect, Route, Router, Switch} from "react-router-dom";
import CompaniesList from "./containers/CompaniesList";
import CompanyPage from "./containers/CompanyPage";
import FundraisingPage from "./components/FundraisingPage";
import RequestsPage from "./containers/RequestsPage";
import {connect} from "react-redux";
import Signup from "./components/Signup";
import AddCompany from "./components/AddCompany";
import {authOnly, unauthOnly} from "./auth";
import Login from "./components/Login";
import Account from "./containers/Account";
import MyCompany from "./containers/MyCompany";
import history from "./history"
import {Col, Layout, Row} from "antd";
import styles from './App.module.scss'
import HeaderMenu from "./components/HeaderMenu";
import {currentUserSelector} from "./ducks/users/selectors";

function App({dispatch, user}) {
  useEffect((...props) => {
    dispatch({type: 'FETCH_USER_REQUEST'})
  }, [])

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
        <Layout.Header className={styles.header}>
          <Row>
            <Col span={4} offset={4}>
              <div className={styles.logo}>
                <Link to="/">
                  Scramble
                </Link>
              </div>
            </Col>
            <Col span={10} push={2}>
              {user.id && <HeaderMenu />}
            </Col>
          </Row>

        </Layout.Header>
        <Layout.Content>
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
            <Route
              path="/my-company"
              component={authOnly(MyCompany)}
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

export default connect((state) => ({
  user: currentUserSelector(state),
}), null)(App);
