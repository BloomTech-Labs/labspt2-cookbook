import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import IndividualRecipe from "./IndividualRecipe"
import axios from 'axios';
import { bindActionCreators } from 'redux';
import  {getUser} from '../actions/UserActions';
import {addRecipe, addRecipeSuccess, getSelectedRecipe, getRecipes} from '../actions/RecipeActions';
import NavBar from "./NavBar";


import '../css/RecipeList.css';



class RecipeList extends Component{


    constructor(props) {
        super(props)
        
      
       
            this.editModalOpen = this.editModalOpen.bind(this);

        this.state = {
            editModal:false,
            filterModal:false,
            dateChange : '',
            selectedItem: [],
            recipes : [
                {
                    name: 'cheeseburger'
                },
                {
                    name: 'ham and beans'
                },
                {
                    name: 'A potato'
                },
            ]
        }

    }


   
    componentDidMount() {
        let id = 1
        let addedRecipe = {
            recipe_id: 1
        }
        
        this.props.getRecipes(id)
}

filterModalOpen = () =>{
    this.setState({
        filterModal:true
    })
}
filterModalClose = () =>{
    this.setState({
        filterModal:false
    })
} 
editModalOpen = (item) =>{
    this.setState({
        editModal:true,
        selectedItem: item
    })
    
}
editModalClose = () =>{
    this.setState({
        editModal:false
    })
} 
onChangeDate = (event) =>{
    this.setState({
        dateChange : event.target.value
    })
}


   


     

    render(){
        return (
             <div className="Recipe-List-Page">
             <NavBar />

            <div className="recipe-list-container">

            <div className='recipe-list-intro-container'>
                            <h1 className='recipe-list-header'>Your Recipes!</h1>
                            <div className='recipe-list-p'>View and search your collection of recipes, view single recipes and modify for later use by your shopping list.</div>
            </div>
            <div className="recipe-list-search-section" >
                            
                        
                            <Link to="/create" className="create-recipe-link">Add Recipe</Link>

                        <div className="search-bar">Search your recipes<input className="search-bar" /></div>
                        <div onClick={this.filterModalOpen} className='filter-button'>Filter</div>
                        
                        <div className= {this.state.filterModal ? 'filter-modal-open' : 'filter-modal-closed'}>
                            <div onClick={this.filterModalClose}>X</div>
                            <div className='filter-modal-header'>Filter by my type</div>
                            <div className='filter-modal-inputs-container'>
                                <div>Breakfast</div>
                                <div>Lunch</div>
                                <div>Dinner</div>
                                <div>Snack</div>
                                <div>Dessert</div>
                            </div>
                            <div className='filter-modal-submit-button'>Submit</div>
                        </div> 

                    </div>

                
                 
                 <div className="recipeContent">



                {this.props.recipes.map((item) => (
                    <div key={item.name} style={{margin: '10px'}}>
                    
                        
                        <Link to={`/recipes/${item.recipe_id}`} >
                                    <div className='recipe-card-header'>{item.name}</div>
                                    <div className='recipe-card-content'>text some card text</div>
                        </Link>
                        
                        <div className='recipe-card-button-container'>
                                    <div onClick={() => this.editModalOpen(item)} className='recipe-card-edit-button'>Edit</div>
                                    <div className="recipe-card-delete-button">Delete</div>
                        </div>
                    
                    
                    
                    
                    
                    </div>
                )   )}

                        <div className={this.state.editModal ? 'recipe-edit-modal-open' : 'recipe-edit-modal-closed'}>
                            <div className ='recipe=edit-modal-header'>Edit {this.state.selectedItem.name}</div>
                            <form className='edit-recipe-form'>
                                <div onClick ={this.editModalClose}>X</div>
                                <div>
                                    <p>Select date</p>
                                    <input type = 'date' value ={this.state.dateChange} onChange = {this.onChangeDate}/>
                                </div>
                                <div className='edit-modal-inputs-container'>
                                    <div>Breakfast</div>
                                    <div>Lunch</div>
                                    <div>Dinner</div>
                                    <div>Snack</div>
                                    <div>Dessert</div>
                                </div>
                                <div className ='edit-modal-submit-button'>Submit</div>
                            </form>
                        </div>

                
                </div>
            </div>   
        </div>          
        )
    }
} 

const mapDispatchToProps = (dispatch) => bindActionCreators({getRecipes, getUser, addRecipe, addRecipeSuccess, getSelectedRecipe}, dispatch)

const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.UserReducer.user,
        recipes: state.RecipeReducer.recipes
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)


