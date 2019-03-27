import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import NavBar from './NavBar';

import axios from 'axios';




import '../css/CalendarPage.css';

class CalendarPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            openDayModal : false,
            userId :   '' , //this.props.userId,  //  Why does this work, but not setState in componentDidMount
            recipeArr : ['cheeseburger', 'mac&cheese', 'queso'],
            filteredRecipeArr : [],
            selectedRecipe : '',
            date: null,
            tag: null
         
        }
    }
    async componentDidMount(){
       await this.setState({
           userId: this.props.userId,
           
       })
       //console.log(this.state);
       this.recipeGetById();
       
    }
    recipeGetById = () =>{
        console.log(this.state.userId);
        axios   
            .get(`https://kookr.herokuapp.com/api/recipes/user/${this.state.userId}`)
                .then(res =>{
                    // this.setState({
                    //     recipeArr: res   //( .data?)
                    // })
                })
                .catch(err =>{
                    console.log('Error fetching recipes by user Id', err);
                })             
    }
    dayClick = (clickedDay) =>{
        this.setState({
            openDayModal : true,
            // date : clickedDay.getDate()
        });
        var MyDate = clickedDay;
        var MyDateString;
        MyDateString =  MyDate.getFullYear() + '/'
        + ('0' + (MyDate.getMonth()+1)).slice(-2) + '/'
        + ('0' + MyDate.getDate()).slice(-2) + '/'
       
        console.log(MyDateString);
        this.setState({
            date: MyDateString
        })
    }
    calendarSearchFunction = (event) =>{
        event.preventDefault();
        var updatedArr = this.state.recipeArr;
        updatedArr = updatedArr.filter(function(item){
          return item.toLowerCase().search(
            event.target.value.toLowerCase()) !== -1;
        });
        this.setState({filteredRecipeArr: updatedArr});
      }
    onSelectRecipe = async(selectedRecipe) =>{
        await this.setState({
            selectedRecipe
        });
        console.log(this.state);
    }
    tagSelector = async(event) =>{
        const tag = event.target.dataset.txt;
        await this.setState({
            tag: tag
        })
        console.log(this.state.tag);
    }
    calendarEventPost = () =>{
        console.log('State: ', this.state);
        const calendarEvent = {
            date: this.state.date, 
            recipe  : this.state.selectedRecipe
        }
    }
    
    postTagToRecipe = () =>{
        const tag = this.state.tag;
        console.log('I am tag from post',this.state.tag);
        //const recipeId = this.state.selectedRecipe.recipe_id //??????Make sure it's recipe_id
        const recipeId = 2
        console.log('I am selected recipe from post', this.state.selectedRecipe)
        axios
            .post(`https://kookr.herokuapp.com/api/tags/recipe/${recipeId}`, tag)
                .then(res =>{
                    console.log(res)
                })
                .catch(err =>{
                    console.log('Error adding tag to recipe by id', err)
                })
    }
    onSaveFunction = () =>{
        this.postTagToRecipe();
        this.calendarEventPost();
    }
    render(){
        return (
            <div className="CalendarPage">
                <NavBar />
                <div className='calendar-page-container'>
                    <div className='calendar-and-header'>
                        <h2 className='calendar-page-header'>Start by Selecting a Day</h2>
                        <Calendar calendarType = {'US'} onClickDay = {this.dayClick} className = 'react-calendar'/>   
                    </div>
                    <div className='calendar-recipe-section'>
                        <div className='recipe-search-section'>
                            <div className='recipe-search'>
                                <h4>Search Your Recipes:</h4>
                                <input className='recipe-search-input' type="text" placeholder="Search"  onChange = {this.calendarSearchFunction}/>
                            </div>
                            <div className='calendar-recipe-list'>
                                {this.state.filteredRecipeArr.map(recipe =>{
                                    return(
                                        <div  key = {Math.random()}>
                                            <div onClick = {() =>this.onSelectRecipe(recipe)}>{recipe}</div>
                                        </div>    
                                    )
                                })}
                            </div>
                        </div>
                        <div className='edit-recipe-section'>  
                            <div className="calendar-meal-tag-container">
                                <h4>Select Tag to Add</h4>
                                <div className='meal-tag-button-section'>
                                    <div data-txt = 'breakfast' onClick = {this.tagSelector}>Breakfast</div>
                                    <div  data-txt = 'lunch' onClick = {this.tagSelector}>Lunch</div>
                                    <div  data-txt = 'dinner' onClick = {this.tagSelector}>Dinner</div>
                                    <div  data-txt = 'dessert' onClick = {this.tagSelector}>Dessert</div>
                                    <div  data-txt = 'snack' onClick = {this.tagSelector}>Snack</div>
                                </div>    
                            </div>
                            <div className='servings-and-duplicate-container'>
                                <input type="number" min="1" />
                                <input type="checkbox" /> Duplicate Previous Week
                            </div>    
                            <div onClick = {this.onSaveFunction} className='save-button'>
                                Save 
                            </div>
                        </div>     
                    </div>    
                </div>
            </div>
            
                 
        )
    }
} 

const mapStateToProps = state => {
    return {
        user: state.UserReducer.user,
        calendar: state.CalendarReducer.calendar,
        recipes: state.RecipeReducer.recipes,
        directions: state.DirectionsReducer.directions,
        recipeingredients: state.RecipeIngredientsReducer.recipeingredients,
        ingredients: state.IngredientsReducer.ingredients,
        tags: state.TagsReducer.tags,
    }
}


export default connect(mapStateToProps)(CalendarPage)