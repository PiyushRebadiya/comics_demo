import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./component/Login";
import DashBoard from "./component/DashBoard";
import Log_Out from './component/LogOut'
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dash" component={DashBoard} />
          <Route path="/logout" component={Log_Out} />
        </Switch>
      </Router>
      <h1>Piyush</h1>
    </>
  );
}

export default App;
