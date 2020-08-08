import React, { Component } from "react";
import "./App.css";
import "antd/dist/antd.css";
import "./bootstrap.css";
import Register from "./containers/User/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./containers/User/Login";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Register}></Route>
            <Route path="/login" exact component={Login}></Route>

          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
