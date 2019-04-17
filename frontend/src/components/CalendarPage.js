import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import NavBar from './NavBar';
import moment from 'moment';
import Moment from 'moment';
import axios from 'axios';
import { extendMoment } from 'moment-range';
import '../css/CalendarPage.css';



const rangerDanger = extendMoment(Moment)



class CalendarPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            openDayModal : false,
            userId :   '' , //this.props.userId,  //  Why does this work, but not setState in componentDidMount
            recipes : [],
            testRecipes: [],
            filteredRecipeArr : [],
            selectedRecipe : '',
            date: null, 
            forwardDate: null,
            backwardDate: null,
            tag: null,
            servingsModal:false,
            tagModal:false
         
        }
    }
    async componentDidMount(){
        console.log(localStorage.getItem('userId'))
        const userId = localStorage.getItem('userId');
        await this.setState({
            userId : userId
     });
       this.recipeGetById();
       this.testGetRecipe();
       
    }
    testGetRecipe = async() =>{
        await axios
            .get(`https://kookr.herokuapp.com/api/recipes/user/1`)
                .then(res =>{
                    this.setState({
                        testRecipes : res.data 
                    }) 
                     
                })
                .catch(err =>{
                    console.log(err);
                })
                console.log(this.state.testRecipes);
    }           
    recipeGetById = () =>{
        // console.log(this.state.userId);
        axios   
            .get(`https://kookr.herokuapp.com/api/recipes/user/${this.state.userId}`)
                .then(response =>{
                    // console.log(response);
                    this.setState({
                        recipes: response.data  
                    })
                })
                .catch(err =>{
                    console.log('Error fetching recipes by user Id', err);
                })             
    }
    dayClick = (clickedDay) =>{
        this.setState({
            openDayModal : true,
        });
        var MyDate = clickedDay;
        var MyDateString;
        MyDateString =  MyDate.getFullYear() + '/'
        + ('0' + (MyDate.getMonth()+1)).slice(-2) + '/'
        + ('0' + MyDate.getDate()).slice(-2) + '/'
        
        console.log(MyDateString);
        this.setState({
            date: MyDateString,
        })
    }
    getWeek = () =>{
        const currentDate = moment(this.state.date);
        const formattedCurrent = currentDate.clone().format('YYYY-MM-DD');
        const formattedCurrentPlus = currentDate.clone().add(1, 'days').format('YYYY-MM-DD');
        const endOfWeek = currentDate.clone().add(1, 'week').format('YYYY-MM-DD')
        const prevWeekStart = currentDate.clone().subtract(6, 'days').format('YYYY-MM-DD');
        const prevDates = this.getDateArray(new Date(prevWeekStart), new Date(formattedCurrent));                                                                                                           
        prevDates.forEach(function(date) {
          console.log(date);
        });
        // const nextDates = this.getDateArray(new Date(formattedCurrentPlus), new Date(endOfWeek));                                                                                                           
        // nextDates.forEach(function(date) {
        //   console.log(date);
        // });

    }


    getDateArray = (startDate, endDate) =>{
        var dates = [],
            currentDate = startDate,
            addDays = function(days) {
              var date = new Date(this.valueOf());
              date.setDate(date.getDate() + days);
              return date;
            };
        while (currentDate <= endDate) {
          dates.push(currentDate);
          currentDate = addDays.call(currentDate, 1);
        }
        return dates;
      };
//Read only with recipeArr??
    calendarSearchFunction = (event) =>{
        event.preventDefault();
        // const updatedArr = this.state.recipes;
        const updatedArr = this.state.testRecipes;
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
    openServingsModal = () =>{
        this.setState({
            servingsModal:true
        })
    }
    closeServingsModal = () =>{
        this.setState({
            servingsModal:false
        })
    }
    openTagModal = () =>{
        this.setState({
            tagModal:true
        })
    }
    closeTagModal = () =>{
        this.setState({
            tagModal:false
        })
    }
    
    render(){
        return (
            <div className="CalendarPage">
                <NavBar />
                <div className='calendar-page-container'>
                    <div className='calendar-page-sub-container'>
                        <div className='calendar-and-intro'>
                            <div className='calendar-intro-container'>
                                <h2 className='calendar-page-header'>Your Calendar</h2>
                            </div>
                            <div className='calendar-row'>
                                <p className='calendar-page-p'>Start by selecting a day on the calendar. Create a customized meal plan for that day to populate your shopping list.</p> 
                                <div className='calendar-housing'>
                                    <Calendar calendarType = {'US'} onClickDay = {this.dayClick} className = 'calendar-page-react-calendar'/>
                                </div>    
                            </div>
                        </div>
                        <div className='calendar-recipe-section'>
                            <div className='recipe-search-section'>
                                <div className='recipe-search'>
                                    <input className='recipe-search-input' type="text" placeholder="Search your recipes"  onChange = {this.calendarSearchFunction}/>
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
                            <div className='servings-and-edit-section'>
                                <div className='servings-and-duplicate-container'>
                                    <p>How many servings?</p>
                                    <input className = 'servings-input'type="number" min="1" />
                                    <p className='check-box-p'>Duplicate previous week's shopping list</p>
                                    <input type="checkbox" id='check-box' className ='check-box' onClick = {this.getWeek}/>
                                    
                                </div>    
                                <div className='edit-recipe-section'>  
                                    <div className="calendar-meal-tag-container">
                                        <h4 className='calendar-tag-header'>Select Tag to Add</h4>
                                        <div className='calendar-meal-tag-button-section'>
                                            <div className = 'calendar-meal-tag' data-txt = 'breakfast' onClick = {this.tagSelector}>Breakfast</div>
                                            <div  className = 'calendar-meal-tag' data-txt = 'lunch' onClick = {this.tagSelector}>Lunch</div>
                                            <div  className = 'calendar-meal-tag' data-txt = 'dinner' onClick = {this.tagSelector}>Dinner</div>
                                            <div  className = 'calendar-meal-tag' data-txt = 'dessert' onClick = {this.tagSelector}>Dessert</div>
                                            <div  className = 'calendar-meal-tag' data-txt = 'snack' onClick = {this.tagSelector}>Snack</div>
                                        </div>    
                                    </div>
                                </div>


                                <div className='servings-and-edit-section-mobile'>
                                    <h3 onClick = {this.openServingsModal} className='calendar-edit-header-mobile'>Edit servings</h3>
                                    <div className={this.state.servingsModal ? 'servings-modal-open'  : 'servings-modal-closed'}>
                                        <div className = 'calendar-servings-modal'>
                                            <div onClick={this.closeServingsModal}>X</div>
                                            <input className = 'servings-input'type="number" min="1" />
                                            <p className='check-box-p'>Duplicate previous week's shopping list</p>
                                            <input type="checkbox" id='check-box' className ='check-box'/>
                                        </div> 
                                    </div>    
                                    <div className='edit-recipe-section-mobile'>  
                                        <h4 onClick ={this.openTagModal} className='calendar-tag-header-mobile'>Select Tag to Add</h4>
                                        <div className={this.state.tagModal ? 'tag-modal-open'  : 'tag-modal-closed'}>
                                            <div className='calendar-tag-modal'>
                                                <div onClick={this.closeTagModal}>X</div>
                                                <div className='meal-tag-button-section'>
                                                    <div data-txt = 'breakfast' onClick = {this.tagSelector}>Breakfast</div>
                                                    <div  data-txt = 'lunch' onClick = {this.tagSelector}>Lunch</div>
                                                    <div  data-txt = 'dinner' onClick = {this.tagSelector}>Dinner</div>
                                                    <div  data-txt = 'dessert' onClick = {this.tagSelector}>Dessert</div>
                                                    <div  data-txt = 'snack' onClick = {this.tagSelector}>Snack</div>
                                                </div>
                                            </div>        
                                        </div>
                                       
                                    </div>
                                </div>             
                            </div>   
                        </div>
                        <div onClick = {this.onSaveFunction} className='save-button'>
                            Save 
                        </div>  
                        <img src = '../images/salad.png'/>
                        <img src= '../images/popcorn.png'/>
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