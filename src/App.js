import React from 'react';
import {Redirect, Route, BrowserRouter as Router, Switch} from "react-router-dom";
import CompaniesList from "./components/CompaniesList";
import CompanyPage from "./components/CompanyPage";
import FundraisingPage from "./components/FundraisingPage";
import RequestsPage from "./components/RequestsPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/companies"
          exact
          component={CompaniesList}
        />
        <Route
          path="/companies/:id"
          component={CompanyPage}
        />
        <Route
          path="/fundraising"
          component={FundraisingPage}
        />
        <Route
          path="/requests"
          component={RequestsPage}
        />
        <Redirect
          to="/companies"
        />
      </Switch>
    </Router>
  );
}

export default App;
