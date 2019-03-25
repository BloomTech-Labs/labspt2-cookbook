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
            date: '',
            tag: ''
         
        }
    }
    //organize array by date
    //calendar back end should take date, recipe, tags
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
    dayClickModalOpen = (clickedDay) =>{
        this.setState({
            openDayModal : true,
            // date : clickedDay.getDate()
        });
        var MyDate = clickedDay;
        var MyDateString;
        MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/'
             + ('0' + (MyDate.getMonth()+1)).slice(-2) + '/'
             + MyDate.getFullYear();
        console.log(MyDateString);
        this.setState({
            date: MyDateString
        })
    }
    modalCloser = () =>{
        this.setState({
            openDayModal: false
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
        // const calendarEvent = {
        //     date: this.state.date, recipeEventObj : 
        //         {selectedRecipe: this.state.selectedRecipe, 
                
        //         }
        // }
    }
    
    postTagToRecipe = () =>{
        const tag = this.state.tag;
        console.log('I am tag from post',this.state.tag);
        //const recipeId = this.state.selectedRecipe.recipe_id //??????Make sure it's recipe_id
        const recipeId = 2
        console.log('I am selected recipe from post', this.state.selectedRecipe)
        // axios
        //     .post(`https://kookr.herokuapp.com/api/tags/recipe/${recipeId}`, tag)
        //         .then(res =>{
        //             console.log(res)
        //         })
        //         .catch(err =>{
        //             console.log('Error adding tag to recipe by id', err)
        //         })
    }
    onSaveFunction = () =>{
        this.postTagToRecipe();
        this.calendarEventPost();
    }
    render(){
        return (
            <div className="CalendarPage">
                <NavBar />
                <div className='calendar-container'>
                    <div className='calendar-body'>   
                        <Calendar onClickDay = {this.dayClickModalOpen} className = 'react-calendar'/>
                        
                        <div className = {this.state.openDayModal ? 'open-calendar-modal' : 'closed-calendar-modal'}>
                        <div>
                <input type="text" placeholder="Search"  onChange = {this.calendarSearchFunction}/>
                <div className='calendar-recipe-list'>
                    {this.state.filteredRecipeArr.map(recipe =>{
                        return(
                            <div  key = {Math.random()}>
                                {/* <CalendarRecipe name='selectedRecipe' value={this.state.selectedRecipe} recipe = {recipe}
                               
                                /> */}
                                <div onClick = {() =>this.onSelectRecipe(recipe)}>{recipe}</div>
                            </div>    
                        )
                    })}
                </div>
                <div className="calendar-meal-tag-section">
                    <h3>Select Tag to Add</h3>
                    <div className='meal-tag-button'>
                        <div data-txt = 'breakfast' onClick = {this.tagSelector}>Breakfast</div>
                        <div  data-txt = 'lunch' onClick = {this.tagSelector}>Lunch</div>
                        <div  data-txt = 'dinner' onClick = {this.tagSelector}>Dinner</div>
                        <div  data-txt = 'dessert' onClick = {this.tagSelector}>Dessert</div>
                        <div  data-txt = 'snack' onClick = {this.tagSelector}>Snack</div>
                    </div>    
                    <div onClick = {this.postTagToRecipe}>
                        Add Recipe and tags//save
                    </div>
                    <input type="number" min="1" />
                </div>
            </div>
            <div onClick = {this.onSaveFunction}>
                        Save 
                    </div>
                            <div onClick = {this.modalCloser} className='calendar-modal-close-button'>x</div>
                        </div>
                    </div>
                    <form className='calendar-edit-form'>
                        <div className='edit-servings-container'>
                            <input type="checkbox" /> Duplicate Previous Week
                            
                        </div>    
                    </form>
                </div>  
            </div>             
        )
    }
} 

const mapStateToProps = state => {
    return {
        user: state.UserReducer.user
    }
}


export default connect(mapStateToProps)(CalendarPage)