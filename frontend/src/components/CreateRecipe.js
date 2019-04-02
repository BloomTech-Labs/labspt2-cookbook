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


        userId: '', //this.props.userId, ///Should I be doing this with auth id or retriving the user id?

        tag: null,
        recipeId:null, 
        servings: ''
       
      }
  }

  //Can post and get by ID go in same function??
//Post recipe to db
//Get / Set recipe Id in state
//Put id in post tag route

//iFrame handled w front end

 componentDidMount(){
     console.log(localStorage.getItem('userId'));
    const userId = localStorage.getItem('userId');
     //console.log(authId);
    this.setState({
         userId : userId
     });
    

 }
s
 dropHandler = event =>{
      const url = event.dataTransfer.getData('text');
      console.log(url)
    this.setState({
        recipeUrl : url
    })
     
}
postRecipe = (event) =>{
    event.preventDefault();
    const recipeAndUser = { name : '', user_id : `${this.state.userId}`, recipeUrl : `${this.state.recipeUrl}`};
    const newRecipeObj = Object.assign({},recipeAndUser);
    axios
        .post('https://kookr.herokuapp.com/api/recipes', {newRecipeObj})
            .then(response =>{
                console.log(response);
                this.setState({
                    recipeId : response.data.recipe_id ///Make sure that is right
                })
            })
            .catch(err =>{
                console.log('Could not add new recipe obj', err);
            })
    console.log(newRecipeObj);
}
dayClick = (clickedDay) =>{
    this.setState({
        openDayModal : true,
    });
    var MyDate = clickedDay;
    var MyDateString;
    MyDateString = MyDate.getFullYear() + '/'
    + ('0' + (MyDate.getMonth()+1)).slice(-2) + '/'
    + ('0' + MyDate.getDate()).slice(-2) + '/'
    console.log(MyDateString);
    this.setState({
        date: MyDateString
    })
}
tagSelector = async(event) =>{
    const tag = event.target.dataset.txt;
    await this.setState({
        tag: tag,
        
    })
    console.log(this.state.tag);
    
}
addClass = (event) =>{
    event.target.classList.toggle('selected');
}
clickHandle = (event) =>{
    this.tagSelector(event);
    this.addClass(event);
}


postTagToRecipe = () =>{
    const tag = this.state.tag;
    console.log('I am tag from post',this.state.tag);
    console.log(this.state.servings);
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
servingsAdjustor = async (event) =>{
    await this.setState({
        [event.target.name] : event.target.value
    });
    console.log(this.state.servings);
    
}
    render(){
        return(
            <div className='Create-Recipe'>
                <NavBar /> 
                <div className='create-page-container'>
                    <div className='create-page-sub-container'>
                        <div className ='create-intro-container'>
                            <h2 className='create-recipe-header'>Add Your Recipes!</h2>
                            <p className='create-recipe-p'>Drag and drop the link to your favorite recipe below, click the add button, and designate a mealtime, date, and serving size.</p>
                        </div>
                        <div className='url-add-recipe-section'> 
                            <input 
                                className='url-drop-input' 
                                placeholder='  Drag and drop url here'
                                onDrop={this.dropHandler}/>
                            <div onClick = {this.postRecipe} className='url-add'>Add</div>        
                        </div>
                        <div className='recipe-preview'>
                            <div className='recipe-preview-title-and-info'>
                                <h3 className='recipe-preview-header'>Slammin' Salmon</h3>
                                <div className='recipe-info-container'>  
                                    <div className='prep-time-container'>
                                        <p>Prep Time:</p>
                                        <p> 3 years</p>
                                    </div>
                                    <div className='cook-time-container'>
                                        <p>Cook Time:</p>
                                        <p> 1 year</p>
                                    </div>
                                    <div className='servings-amount-container'>
                                        <p>Servings:</p>
                                        <p> 4</p>
                                    </div>
                                </div>      
                            </div>
                            <div className='recipe-preview-image'>
                                <div className ='recipe-image-sub'>
                                    <img className ='recipe-preview-img'src ='https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/11/25/0/FNK_pan-seared-salmon-with-kale-apple-salad_s4x3.jpg.rend.hgtvcom.616.462.suffix/1387918756116.jpeg' alt ='fish-dish' />
                                </div> 
                            </div>
                            <div className='meal-tag-section'>
                                <h3 className='meal-tag-header'>For which meal?</h3>
                                <div className='meal-tag active focus'>
                                    <p className='meal-tag-p' data-txt = 'breakfast' onClick={this.clickHandle}>Breakfast</p>
                                
                                </div>
                                <div className='meal-tag'>
                                    <p className='meal-tag-p' data-txt = 'lunch' onClick={this.clickHandle}>Lunch</p>
                                
                                </div>
                                <div className='meal-tag'>
                                    <p className='meal-tag-p' data-txt = 'dinner' onClick={this.clickHandle}>Dinner</p>
                                
                                </div>
                                <div className='meal-tag'>
                                    <p className='meal-tag-p' data-txt = 'snack' onClick={this.clickHandle}>Dessert</p>
                                
                                </div>
                                <div className='meal-tag'>
                                    <p className='meal-tag-p' data-txt = 'dessert' onClick={this.clickHandle}>Snack</p>
                                
                                </div>
                            </div>
                        </div>     
                        <div className='recipe-modification-section'>
                            <div className='calendar-section'>
                                <h4 className='calendar-directions-header'>Select a calendar date to assign your recipe to.</h4>
                                <Calendar onClickDay = {this.dayClick} className='react-calendar'/>
                            </div>
                            <div className='edit-servings-section'>
                                <div className='servings-container'>
                                    <h3 className='edit-servings-header'>Select a serving amount to be applied to this recipe on your shopping list.</h3>
                                    <p className='edit-servings-p'>How many servings?</p>
                                    <input className ='servings-input' name = 'servings' value = {this.state.servings} onChange = {this.servingsAdjustor} type="number" min="1" /> 
                                </div>
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
    console.log(state)
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

