import React, {useEffect} from 'react';
import {Redirect, Route, Router, Switch} from "react-router-dom";
import CompaniesList from "./containers/CompaniesList";
import CompanyPage from "./containers/CompanyPage";
import FundraisingPage from "./components/FundraisingPage";
import RequestsPage from "./containers/RequestsPage";
import {connect} from "react-redux";
import Signup from "./components/Signup";
import AddCompany from "./components/AddCompany";
import {authOnly, unauthOnly, withCompany, withoutCompany} from "./auth";
import Login from "./components/Login";
import MyCompany from "./containers/MyCompany";
import history from "./history"
import {currentUserSelector} from "./ducks/users/selectors";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import styles from './App.module.scss'

const appWrapper = Component => props => (
  <div className={styles.app}>
    <Header/>
    <Component {...props} />
    <Footer/>
  </div>
)

function App({dispatch, user}) {
  useEffect((...props) => {
    dispatch({type: 'FETCH_USER_REQUEST'})
    dispatch({type: 'FETCH_WATCHLIST_REQUESTS_REQUEST'})
  }, [])

  const signup = (values) => {
    const data = new FormData()
    Object.keys(values).forEach(key => {
      data.append(key, values[key])
    })
    dispatch({type: 'SIGNUP_REQUEST', payload: values})
  }

  const login = (values) => {
    dispatch({type: 'LOGIN_REQUEST', payload: values})
  }

  const addCompany = (values) => {
    const data = new FormData()
    Object.keys(values).forEach(key => {
      data.append(key, values[key])
    })
    dispatch({type: 'ADD_COMPANY_REQUEST', payload: data})
  }

  const myCompany = (values) => {
    dispatch({type: 'ADD_UPDATE_REQUEST', payload: values})
  }

  return (
    <Router history={history}>
      {/*<Header />*/}
      <Switch>
        {/*<Route*/}
        {/*  path="/signup"*/}
        {/*  component={unauthOnly(props => <Signup onSignupFormSubmit={signup} {...props}/>)}*/}
        {/*/>*/}
        <Route
          path="/login"
          component={unauthOnly(props => <Login onLoginFormSubmit={login} {...props}/>)}
        />
        <Route
          path="/companies"
          exact
          component={authOnly(withCompany(appWrapper(CompaniesList)))}
        />
        <Route
          path="/companies/:companyId"
          component={authOnly(withCompany(appWrapper(CompanyPage)))}
        />
        <Route
          path="/fundraising"
          component={authOnly(withCompany(appWrapper(FundraisingPage)))}
        />
        <Route
          path="/requests"
          component={authOnly(withCompany(appWrapper(RequestsPage)))}
        />
        <Route
          path="/add-company"
          component={authOnly(withoutCompany(props => <AddCompany
            onAddCompanyFormSubmit={addCompany} {...props} />))}
        />
        <Route
          path="/profile"
          component={authOnly(withCompany(appWrapper(props => <MyCompany
            onMyCompanyFormSubmit={myCompany} {...props}/>)))}
        />
        <Redirect
          to="/login"
        />
      </Switch>
      {/*<Footer/>*/}
    </Router>
  );
}

export default connect((state) => ({
  user: currentUserSelector(state),
}), null)(App);
