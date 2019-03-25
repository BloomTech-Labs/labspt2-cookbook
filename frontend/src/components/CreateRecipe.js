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

class CreateRecipe extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        recipeUrl: '',
        userId: this.props.userId
       
      }
  }
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
    render(){
        return(
            <div className='Create-Recipe'>
                <NavBar /> 
                <div className='create-page-container'>
                    <h2 className='add-recipe-header'>Add Your Recipes!</h2>
                    <div className='url-add-recipe-section'> 
                        <div className='url-input-container'>
                            <input 
                                className='url-drop-input' 
                                placeholder='  Drag and drop url here'
                                onDrop={this.dropHandler}/>
                        </div>       
                        <div onClick = {this.postRecipe} className='url-add-arrow'>></div> 
                    </div>
                    <div className='recipe-preview-container'>
                        <div className='recipe-preview'>
                                I am the recipe preview
                        </div>   
                    </div>    
                    <div className='recipe-modification-section'>
                        <div className='meal-tag-section'>
                            <h3 className='meal-tag-header'>Click to add meal tag</h3>
                            <div className='meal-tag'>
                                <p className='meal-tag-p'>Breakfast</p>
                               
                            </div>
                            <div className='meal-tag'>
                                <p className='meal-tag-p'>Lunch</p>
                               
                            </div>
                            <div className='meal-tag'>
                                <p className='meal-tag-p'>Dinner</p>
                               
                            </div>
                            <div className='meal-tag'>
                                <p className='meal-tag-p'>Dessert</p>
                               
                            </div>
                            <div className='meal-tag'>
                                <p className='meal-tag-p'>Snack</p>
                               
                            </div>
                        </div>
                        <div className='edit-servings-section'>
                            <div className='servings-counter'>Counter</div>
                            <p className='servings-p'>Servings</p>
                            <div className='add-recipe-button'> Save </div> 
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

