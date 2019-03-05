import React, { Component } from 'react';
import { Link } from "react-router-dom";

import IndividualRecipe from "./IndividualRecipe"

class RecipeList extends Component{

    render(){
        return (
            <div className="recipeListPage">
                <div className="topBar">
                    <div className="newRecipeLink"><Link to="/create-recipe">Add Recipe</Link></div>
                    <input />
                    <div className="filterSection">
                        <div className="filterButton"> Filter </div>
                        <div className="filterContent">
                            <form>
                                <input name="filter" type="radio">Breakfast</input>
                                <input name="filter" type="radio">Lunch</input>
                                <input name="filter" type="radio">Dinner</input>
                                <input name="filter" type="radio">Dessert</input>
                                <input name="filter" type="radio">Snack</input>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="recipeContent">
                    {/* Will map out something like this...

                    {this.state.recipes.map( item => (
                    <Link to={`/recipe/${item.id}`}>
                        <IndividualRecipe />
                    </Link>
                    ))}
                    */}

                </div>
            </div>           
        )
    }
} 

export default RecipeList