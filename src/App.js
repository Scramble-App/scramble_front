import React from 'react';
import {Redirect, Route, BrowserRouter as Router, Switch} from "react-router-dom";
import CompaniesList from "./components/CompaniesList";
import CompanyPage from "./components/CompanyPage";

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
        <Redirect
          to="/companies"
        />
      </Switch>
    </Router>
  );
}

export default App;
