import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import IndividualRecipe from "./IndividualRecipe"
import axios from 'axios';
import { bindActionCreators } from 'redux';
import  {getUser} from '../actions/UserActions'
import NavBar from "./NavBar";
import '../css/RecipeList.css';

class RecipeList extends Component{

    componentDidMount() {
        this.props.getUser(user)
        //should only be one user
       // let id = this.props.user[0].user_id
        let id = 3
        // axios.get(`https://kookr.herokuapp.com/api/recipes/${id}`, (req, res) => {
        //     console.log(res)
        //     //gets all recipes for a particular user
        //})
        let user = {
            id: 0
        }
    }

    render(){
        return (
           
             <div className="recipeListPage">
             <NavBar />

            <div className="recipeList-container">
                 <div className="calendar-topBar" >
                    <div className="newRecipeLink"><Link className="create-tag-p" to="/create">Add Recipe</Link></div>
                     <div className="search-bar">Search<input className="search-bar" /></div>
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
        </div>          
        )
    }
} 

const mapDispatchToProps = (dispatch) => bindActionCreators({getUser}, dispatch)

const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.UserReducer.user,
        recipes: state.RecipeReducer.recipes
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)


