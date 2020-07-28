import React, { Component } from 'react';


import './App.css';
import Register from './containers/User/Register';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
 
  render() {
   

   
        return (
      <div className="App">
     <Router>
          <Switch>
            <Route path="/" exact component={Register}></Route>
                     </Switch>
        </Router>
      
      </div>
    );
  }
}

export default App;
