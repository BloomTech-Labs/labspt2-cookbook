import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import LandingPage from './components/LandingPage';
import CreateRecipe from './components/CreateRecipe';
import RecipeList from "./components/RecipeList";
import IndividualRecipe from "./components/IndividualRecipe";
import CalendarPage from "./components/CalendarPage";
import GroceryList from "./components/GroceryList";
import Settings from "./components/Settings";
import SingleRecipe from "./components/SingleRecipe";


class App extends Component {
  constructor(){
    super()
    this.state = {
      id: ''
    }
  }
  idClickHandler = (userId) =>{
    
    this.setState({
      id: userId
    });
    console.log(this.state);
}
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path='/' render = {(props) => < LandingPage {...props} idClickHandler = {this.idClickHandler}/>} />
            <Route exact path='/create' render = {(props) => <CreateRecipe {...props} userId = {this.state.id} />}/>
            <Route exact path="/recipes" component={RecipeList}/>
            <Route exact path="/recipes/:id" component={SingleRecipe}/>
            <Route exact path="/calendar" render = {(props) => <CalendarPage {...props} userId = {this.state.id}/>}/>
            <Route exact path="/grocery-list" component={GroceryList}/>
            <Route exact path="/settings" component={Settings} />
          
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
