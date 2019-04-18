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
            tag: null,
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
clickHandle = async(event,  type) =>{
    event.preventDefault();
    await this.setState({
        tag:type
    })
    console.log(this.state.tag);
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
                <NavBar/>
                <div className="recipe-list-container">
                    <div className='recipe-list-sub-container'>   
                        <div className='recipe-list-intro-container'>
                            <h1 className='recipe-list-header'>Your Recipes!</h1>
                            <div className='recipe-list-p'>View and search your collection of recipes, view single recipes and modify for later use by your shopping list.</div>
                        </div>
                        <div className="recipe-list-search-section" >
                            <div className='recipe-list-button-container'>
                                <Link to="/create" className="create-recipe-link">Add Recipe</Link>
                                <div onClick={this.filterModalOpen} className='recipe-list-filter-button'>Filter</div>
                            </div>    
                            <input placeholder ='  Search your recipes' className="search-bar-input" />
                                <div className= {this.state.filterModal ? 'filter-modal-open' : 'filter-modal-closed'}>
                                    <div className='filter-modal'>   
                                        <div className ='close-filter-modal' onClick={this.filterModalClose}>X</div>
                                        <div className='filter-modal-header'>Filter by Meal</div>
                                        <div className='filter-modal-inputs-container'>
                                        <div className={`filter-meal-tag ${this.state.tag === 'breakfast' ? 'filter-selected' : '' }`} onClick={(e) =>this.clickHandle(e, 'breakfast')}>
                                            <div className='filter-meal-tag-sub'>
                                                <p className ='filter-meal-tag-p'>Breakfast</p>
                                                <img className = 'filter-meal-tag-icon' src ='../images/fried-egg.png'/>
                                            </div>
                                        </div>
                                        <div className={`filter-meal-tag ${this.state.tag === 'lunch' ? 'filter-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'lunch')}>
                                            <div className='filter-meal-tag-sub'>  
                                                <p className = 'filter-meal-tag-p'>Lunch</p>
                                                <img className = 'filter-meal-tag-icon' src ='../images/salad.png'/>
                                            </div>
                                        </div>
                                        <div className={`filter-meal-tag ${this.state.tag === 'dinner' ? 'filter-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'dinner')}>
                                            <div className='filter-meal-tag-sub'>
                                                <p className = 'filter-meal-tag-p'>Dinner</p>
                                                <img className = 'filter-meal-tag-icon' src ='../images/fish.png'/>
                                            </div>
                                        </div>
                                        <div className={`filter-meal-tag ${this.state.tag === 'dessert' ? 'filter-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'dessert')}>
                                            <div className='filter-meal-tag-sub'>
                                                <p className = 'filter-meal-tag-p'>Dessert</p>
                                                <img className = 'filter-meal-tag-icon' src ='../images/cupcake.png'/>
                                            </div>
                                        </div>
                                        <div className={`filter-meal-tag ${this.state.tag === 'snack' ? 'filter-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'snack')}>
                                            <div className='filter-meal-tag-sub'>
                                                <p className = 'filter-meal-tag-p'>Snack</p>
                                                <img className = 'filter-meal-tag-icon' src ='../images/popcorn.png'/>
                                            </div>
                                        </div>
                                        </div>
                                        <div className='filter-modal-submit-button'>Submit</div>
                                    </div> 
                                </div>
                            </div>
                        <div className="recipe-list">
                            {this.props.recipes.map((item) => (
                            <div key={item.name} className='recipe-card'>
                            {console.log(item)}
                                <Link className = 'recipe-link' to={`/recipes/${item.recipe_id}`} >
                                            <div className='recipe-card-header'>{item.name}</div>
                                            {/* <div className='recipe-card-content'>text some card text</div> */}
                                </Link>
                                <div className= 'recipe-card-img-container'>
                                    <img className = 'recipe-card-img' src = {item.image} alt = 'recipe-list-image'/>
                                </div>
                                <div className='recipe-card-button-container'>
                                    <div onClick={() => this.editModalOpen(item)} className='recipe-card-edit-button'>Edit</div>
                                    <div className="recipe-card-delete-button">Delete</div>
                                </div>
                            </div>
                        )   )}

                                <div className={this.state.editModal ? 'recipe-edit-modal-open' : 'recipe-edit-modal-closed'}>
                                    <div className ='recipe-edit-modal-header'>Edit {this.state.selectedItem.name}</div>
                                    <div className='recipe-edit-modal'>   
                                        <form className='edit-recipe-form'>
                                            <div className = 'edit-recipe-modal-close' onClick ={this.editModalClose}>X</div>
                                            <div className= 'edit-recipe-modal-date-container'>
                                                <p className='edit-select-date-p'>Select date</p>
                                                <input className ='edit-recipe-modal-date-input' type = 'date' value ={this.state.dateChange} onChange = {this.onChangeDate}/>
                                            </div>
                                            <div className='edit-meal-tag-section'>
                                                <h3 className='edit-meal-tag-header'>For which meal?</h3>
                                                <div className={`edit-meal-tag ${this.state.tag === 'breakfast' ? 'edit-selected' : '' }`} onClick={(e) =>this.clickHandle(e, 'breakfast')}>
                                                    <div className='edit-meal-tag-sub'>
                                                        <p className ='edit-meal-tag-p'>Breakfast</p>
                                                        <img className = 'edit-meal-tag-icon' src ='../images/fried-egg.png'/>
                                                    </div>
                                                </div>
                                                <div className={`edit-meal-tag ${this.state.tag === 'lunch' ? 'edit-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'lunch')}>
                                                    <div className='edit-meal-tag-sub'>  
                                                        <p className = 'edit-meal-tag-p'>Lunch</p>
                                                        <img className = 'edit-meal-tag-icon' src ='../images/salad.png'/>
                                                    </div>
                                                </div>
                                                <div className={`edit-meal-tag ${this.state.tag === 'dinner' ? 'edit-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'dinner')}>
                                                    <div className='edit-meal-tag-sub'>
                                                        <p className = 'edit-meal-tag-p'>Dinner</p>
                                                        <img className = 'edit-meal-tag-icon' src ='../images/fish.png'/>
                                                    </div>
                                                </div>
                                                <div className={`edit-meal-tag ${this.state.tag === 'dessert' ? 'edit-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'dessert')}>
                                                    <div className='edit-meal-tag-sub'>
                                                        <p className = 'edit-meal-tag-p'>Dessert</p>
                                                        <img className = 'edit-meal-tag-icon' src ='../images/cupcake.png'/>
                                                    </div>
                                                </div>
                                                <div className={`edit-meal-tag ${this.state.tag === 'snack' ? 'edit-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'snack')}>
                                                    <div className='edit-meal-tag-sub'>
                                                        <p className = 'edit-meal-tag-p'>Snack</p>
                                                        <img className = 'edit-meal-tag-icon' src ='../images/popcorn.png'/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className ='edit-modal-submit-button'>Submit</div>
                                        </form>
                                    </div>     
                                </div>

                        
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


