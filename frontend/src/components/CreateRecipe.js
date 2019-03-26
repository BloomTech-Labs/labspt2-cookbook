import React from 'react';
import '../css/CreateRecipe.css';
import axios from 'axios';
import  '../css/CreateRecipe.css';
import NavBar from './NavBar';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { addDirections } from '../actions/DirectionsActions';
import { addIngredients } from '../actions/IngredientsActions';
import { addRecipeIngredients } from '../actions/RecipeIngredientsActions';
import { addRecipe } from '../actions/RecipeActions';
import { addTag } from '../actions/TagsActions';

import Calendar from 'react-calendar'


class CreateRecipe extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        recipeUrl: '',
        userId: this.props.userId,
        tag: null,
        recipeId:null
       
      }
  }

  //Can post and get by ID go in same function??
//Post recipe to db
//Get / Set recipe Id in state
//Put id in post tag route

//iFrame handled w front end

 componentDidMount(){
     console.log('I am create user Id', this.state.userId)
 }

 dropHandler = event =>{
      const url = event.dataTransfer.getData('text');
    this.setState({
        recipeUrl : url
    })
      console.log(url)
}
postRecipe = () =>{
   //console.log(this.state.userId);
   const recipeAndUser = {user_id : `${this.state.userId}`, recipeUrl : `${this.state.recipeUrl}`};
   
    //onsole.log(this.state.recipeUrl);
    const newRecipeObj = Object.assign({},recipeAndUser);
    axios
        .post('https://kookr.herokuapp.com/api/recipes/', {newRecipeObj})
            .then(res =>{
                console.log(res)
            })
            .catch(err =>{
                console.log('Could not add new recipe obj', err);
            })
    console.log(newRecipeObj);
}
dayClick = (clickedDay) =>{
    this.setState({
        openDayModal : true,
        // date : clickedDay.getDate()
    });
    var MyDate = clickedDay;
    var MyDateString;
    MyDateString = ('0' + (MyDate.getMonth()+1)).slice(-2) + '/'
    + ('0' + MyDate.getDate()).slice(-2) + '/'
    + MyDate.getFullYear();
    console.log(MyDateString);
    this.setState({
        date: MyDateString
    })
}
tagSelector = async(event) =>{
    const tag = event.target.dataset.txt;
    await this.setState({
        tag: tag
    })
    console.log(this.state.tag);
}
postTagToRecipe = () =>{
    const tag = this.state.tag;
    console.log('I am tag from post',this.state.tag);
    //const recipeId = this.state.selectedRecipe.recipe_id //??????Make sure it's recipe_id
    const recipeId = this.state.recipeId;
    axios
        .post(`https://kookr.herokuapp.com/api/tags/recipe/${recipeId}`, tag)
            .then(res =>{
                console.log(res)
            })
            .catch(err =>{
                console.log('Error adding tag to recipe by id', err)
            })
}
    render(){
        return(
            <div className='Create-Recipe'>
                <NavBar /> 
                <div className='create-page-container'>
                    <h2 className='create-recipe-header'>Add Your Recipes!</h2>
                    <div className='url-add-recipe-section'> 
                        <div className='url-input-container'>
                            <input 
                                className='url-drop-input' 
                                placeholder='  Drag and drop url here'
                                onDrop={this.dropHandler}/>
                        </div>       
                        <div onClick = {this.postRecipe} className='url-add-arrow'>></div> 
                    </div>
                    <div className='recipe-preview'>
                        <div className='recipe-preview-info'>
                            <h3>Recipe Title</h3>
                            <p>Recipe Info</p>
                        </div>
                        <div className='recipe-preview-image'> 
                            <img></img>
                            Image Placeholder
                        </div>
                    </div>     
                    <div className='recipe-modification-section'>
                        <div className='meal-tag-section'>
                            <h3 className='meal-tag-header'>For which meal?</h3>
                            <div className='meal-tag'>
                                <p className='meal-tag-p' data-txt = 'breakfast' onClick={this.tagSelector}>Breakfast</p>
                               
                            </div>
                            <div className='meal-tag'>
                                <p className='meal-tag-p' data-txt = 'lunch' onClick={this.tagSelector}>Lunch</p>
                               
                            </div>
                            <div className='meal-tag'>
                                <p className='meal-tag-p' data-txt = 'dinner' onClick={this.tagSelector}>Dinner</p>
                               
                            </div>
                            <div className='meal-tag'>
                                <p className='meal-tag-p' data-txt = 'snack' onClick={this.tagSelector}>Dessert</p>
                               
                            </div>
                            <div className='meal-tag'>
                                <p className='meal-tag-p' data-txt = 'dessert' onClick={this.tagSelector}>Snack</p>
                               
                            </div>
                        </div>
                        <div className='calendar-section'>
                            <Calendar onClickDay = {this.dayClick} className='react-calendar'/>
                        </div>
                        <div className='edit-servings-section'>
                            <div className='servings-container'>
                                <h3 className='edit-servings-header'>How many servings?</h3>
                                <input className ='servings-input'type="number" min="1" /> 
                                <div className='add-recipe-button' onClick={this.postTagToRecipe}> Save </div> 
                            </div>
                        </div>
                    </div>
                </div>           
            </div>
        )
    }
}

const mapDispatchtoProps = (dispatch) => bindActionCreators({addDirections, addIngredients, addRecipe, addRecipeIngredients, addTag},dispatch)

const mapStateToProps = state => {
    return {
        user: state.UserReducer.user,
        recipes: state.RecipeReducer.recipes,
        directions: state.DirectionsReducer.directions,
        recipeingredients: state.RecipeIngredientsReducer.recipeingredients,
        ingredients: state.IngredientsReducer.ingredients,
        tags: state.TagsReducer.tags,
        calendar: state.CalendarReducer.calendarItems
    }
}


export default connect(mapStateToProps, mapDispatchtoProps)(CreateRecipe)

