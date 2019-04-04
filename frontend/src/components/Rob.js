import React from 'react';
import { Link } from "react-router-dom";
// import { connect } from 'react-redux';
// import IndividualRecipe from "./IndividualRecipe"
// import axios from 'axios';
// import { bindActionCreators } from 'redux';
// import  {getUser} from '../actions/UserActions'
import NavBar from "./NavBar";
import '../css/Rob.css'


class Rob extends React.Component{
    constructor(){
        super();
        this.state = {
            editModal:false,
            filterModal:false,
            dateChange : '',
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
    // componentDidMount() {
    //     let id = 3
    //      axios.get(`https://kookr.herokuapp.com/api/recipes/${id}`, (req, res) => {
    //          console.log(res)
    //     //     //gets all recipes for a particular user
    //     })
    //     let user = {
    //         id: 0
    //     }
    // }
    componentDidMount(){
        console.log('I am mounted!')
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
    editModalOpen = () =>{
        this.setState({
            editModal:true
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
        return(
            <div className="Recipe-List-Page">
                <NavBar/>
                <div className="recipe-list-container">
                    <div className='recipe-list-sub-container'>
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
                        <div className="recipe-list">
                            {this.state.recipes.map((item) => (
                            <div className='recipe-card' key={item.name}>
                                <Link to={`/recipes/${item.recipe_id}`} >
                                    <div className='recipe-card-header'> Recipe Name</div>
                                    <div className='recipe-card-content'>text some card text</div>
                                </Link>
                                <div className='recipe-card-button-container'>
                                    <div onClick={this.editModalOpen} className='recipe-card-edit-button'>Edit</div>
                                    <div className="recipe-card-delete-button">Delete</div>
                                </div>
                            </div>
                        ))}</div>
                         <div className={this.state.editModal ? 'recipe-edit-modal-open' : 'recipe-edit-modal-closed'}>
                            <div className ='recipe=edit-modal-header'>Edit selected recipe</div>
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
    
export default Rob;