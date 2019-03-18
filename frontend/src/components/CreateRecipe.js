import React from 'react';
import '../css/CreateRecipe.css';

import  '../css/CreateRecipe.css';
import NavBar from './NavBar';
import { connect } from 'react-redux';


class CreateRecipe extends React.Component{
  constructor(){
      super()
      this.state = {
        content: ''
      }
  }
  loadData = (url) => {
    fetch(url)
      .then(function (response) {
        console.log(url + " -> " + response.ok);
        return response.body;
      })
      .then(function (data) {
        console.log("data: ", data);
        this.setState({ content: data });
      }.bind(this))
      .catch(function (err) {
        console.log("failed to load ", url, err.stack);
      });
  }

 dropHandler = event =>{
      event.preventDefault();
      const url = event.dataTransfer.getData('text');
    this.loadData(url);
      console.log(url);
  }
    render(){
        return(
            <div className='Create-Recipe'>
                <NavBar /> 
                <div className='create-page-container'>
                    <div className='url-add-recipe-section'> 
                        <form className='add-recipe-form'>
                            <div className='url-input-container'>
                                <input 
                                    className='url-drop-input' 
                                    placeholder='  Drag and drop url here'
                                    onDrop={this.dropHandler}/>
                            </div>        
                            <div className='recipe-preview'>
                                I am the recipe preview
                            </div>   
                            <div className='add-recipe-button'> Save </div> 
                        </form>
                    </div>
                    <div className='recipe-modification-section'>
                        <div className='meal-tag-section'>
                            <h3 className='meal-tag-header'>Click to add meal tag</h3>
                            <div className='meal-tag'>
                                <p className='meal-tag-p'>Breakfast</p>
                                <img className='meal-tag-icon' src = 'https://image.flaticon.com/icons/svg/1590/1590858.svg' alt = 'bacon-icon'/>
                            </div>
                            <div className='meal-tag'>
                                <p className='meal-tag-p'>Lunch</p>
                                <img className='meal-tag-icon' src = 'https://image.flaticon.com/icons/svg/1034/1034648.svg' alt = 'salad-icon'/>
                            </div>
                            <div className='meal-tag'>
                                <p className='meal-tag-p'>Dinner</p>
                                <img className='meal-tag-icon' src = 'https://image.flaticon.com/icons/svg/1005/1005468.svg' alt = 'fish-icon'/>
                            </div>
                            <div className='meal-tag'>
                                <p className='meal-tag-p'>Dessert</p>
                                <img className='meal-tag-icon' src = 'https://image.flaticon.com/icons/svg/1499/1499251.svg' alt = 'cupcake-icon'/>
                            </div>
                            <div className='meal-tag'>
                                <p className='meal-tag-p'>Snack</p>
                                <img className='meal-tag-icon' src = 'https://image.flaticon.com/icons/svg/1005/1005484.svg' alt = 'watermelon-icon'/>
                            </div>
                        </div>
                        <div className='edit-servings-section'>
                            <div className='servings-counter'>Counter</div>
                            <p className='servings-p'>Servings</p>
                        </div>
                        <div className='calendar-section'>
                            <div className='date-selector'>Date selection placeholder</div>
                            <div className='calendar-mini'>Calendar placeholder</div>
                        </div>
                    </div>
                </div>           
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.UserReducer
    }
}


export default connect(mapStateToProps)(CreateRecipe)


