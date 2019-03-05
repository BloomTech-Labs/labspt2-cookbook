import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
import CreateRecipe from './components/CreateRecipe';
import Settings from "./components/Settings";
import Billing from "./components/Billing";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path = '/' component = {LandingPage} />
            <Route exact path = '/create' component = {CreateRecipe} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/billing" component={Billing} />
          
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
