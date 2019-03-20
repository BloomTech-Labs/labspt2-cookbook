import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { GET_DIRECTIONS, getDirections } from '../actions/DirectionsActions';
import { getIngredients } from '../actions/IngredientsActions';
import { getSelectedRecipe } from '../actions/RecipeActions';




class IndividualRecipe extends Component{


    

componentDidMount()
    {

    let sendingObject = {
        recipe_id: 1
    }
    
    let receivedObject = {

    }
    

    receivedObject = getSelectedRecipe(sendingObject.recipe_id)
    
    getIngredients(0)
    getDirections(sendingObject)
      
      //console.log(sendingObject.recipe_id)
//take recipe ID and get from the server.
//commented out to prevent cors errors
//     axios.get(`https://kookr.herokuapp.com/api/recipes/${sendingObject.recipe_id}`, (req, res) => {
     
    

//     //let value = req.body
//      console.log(sendingObject)
// // need to pull out directions
// // needs to be a full directions object pased might need loops
 

// // need to pull out ingredients
// // needs to be a full object might need loops
      
      

    
// // need to pull information on if this is on a Calendar
// // we need to have a default value for the Calendar information
    
// // need to construct the object that gets passed to the body
//   })
}

    render(){
        return (
            <div className="individualRecipePage">
                <div className="individualRecipeHeader" >
                    <h1>Title</h1>
                    <div>{this.props.recipes.map((recipe) =>  <div key={recipe}> {recipe.recipe_id} </div> )}</div>
                    <div className="editButton">Edit Button</div>
                    <div className="deleteButton">Delete Button</div>
                </div>
                <div className="recipeInfo">
                    <div>
                        <img />
                        <div>Schedule Info</div>
                    </div>
                    <div className="infoCard">
                        <div></div>
                        <div>Cook Time</div>
                        <div>Servings</div>
                    </div>
                    <div className="Ingredients">
                        Map out here
                    </div>
                </div>
                <div className="recipeInstructions">
                    Map out here
                </div>
            </div>           
        )
    }
} 

const mapDispatchToProps = dispatch => {
    let sendingObject = {
        recipe_id: 0
    }
    return {
        getSelectedRecipe: (id) => {
            dispatch(getSelectedRecipe(id))
        },
        getDirections: (id) => {
            // need to loop to get the directions. need to know how many directions
            // exist for this function
            dispatch(getDirections(id))
        },
        getIngredients: (id) => {
            // need to loop to get the ingredients. need to know how many ingredients
            // exist for this function
            dispatch(getIngredients(id))
        }

    }
}

const mapStateToProps = state => {
    return {
        user: state.UserReducer.user,
        recipes: state.RecipeReducer.recipes,
        directions: state.DirectionsReducer.directions,
        recipeingredients: state.RecipeIngredientsReducer.recipeingredients,
        ingredients: state.IngredientsReducer.ingredients
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(IndividualRecipe)
