import React, { Component } from 'react';

class IndividualRecipe extends Component{

    render(){
        return (
            <div className="individualRecipePage">
                <div className="individualRecipeHeader" >
                    <h1>Title</h1>
                    <div className="editButton">Edit Button</div>
                    <div className="deleteButton">Delete Button</div>
                </div>
                <div className="recipeInfo">
                    <div>
                        <img />
                        <div>Schedule Info</div>
                    </div>
                    <div className="infoCard">
                        <div>Prep Time</div>
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

export default IndividualRecipe