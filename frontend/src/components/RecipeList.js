import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import IndividualRecipe from "./IndividualRecipe"
import axios from 'axios';
import { bindActionCreators } from 'redux';
import  {getUser} from '../actions/UserActions'


class RecipeList extends Component{

    componentDidMount() {
        this.props.getUser(user)
        let id = this.props.user[0].user_id
        // axios.get(`https://kookr.herokuapp.com/api/recipes/user/${id}`, (req, res) => {
        //     console.log(res)
        //     //gets all recipes for a particular user
        // })

        let user = {
            id: 0
        }

    }

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
                                 {["Breakfast", "Lunch", "Dinner", "Dessert", "Snack"].map(item=> <label key={item} ><input name="filter" type="radio"/>{item}</label>)}
                             </form>
                         </div>
                     </div>
                 </div>
                 <div className="recipeContent">

                {this.props.recipes.map((item) => (
                    <Link key={item.image.toString()} to={`/recipes/${item.recipe_id}`} >
                        <IndividualRecipe key={item.recipe_id} />
                    </Link>
                )   )}
 
                </div>
            </div>             
        )
    }
} 

const mapDispatchToProps = (dispatch) => bindActionCreators({getUser}, dispatch)

const mapStateToProps = state => {
    return {
        user: state.UserReducer.user,
        recipes: state.RecipeReducer.recipes
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)


