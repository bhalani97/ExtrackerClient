import React, { Component } from "react";
import "./App.css";
import "antd/dist/antd.css";
import Register from "./containers/User/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./containers/User/Login";
import Home from "./containers/Home";
import MainApp from "./containers";
import Account from "./containers/Account";
import Tracker from "./containers/Tracker";
class App extends Component {

  
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
          <Route path="/" exact component={Login}></Route>
            <Route path="/register" exact component={Register}></Route>
            <Route path="/home" exact component={Home}></Route>
            <Route path="/main" exact component={MainApp}></Route>
            <Route path="/tracker" exact component={Tracker}></Route>
            <Route path="/account" exact component={Account}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
