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
            userId :   '' , 
            recipes : [],
            testRecipes: [],
            filteredRecipeArr : [],
            selectedRecipe : '',
            date: null,
            prevWeekArr: [],
            nextWeekArr: [],
            prevWeekRecipeArr: [],
            nextWeekRecipeArr: [],
            tag: null,
            servingsModal:false,
            tagModal:false,
            duplicate:false
         
        }
    }
    async componentDidMount(){
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
                        testRecipes : [...Object.values(res.data)]
                    }) 
                     
                })
                .catch(err =>{
                    console.log(err);
                })
                console.log(this.state.testRecipes[0].name)
    }           
    recipeGetById = () =>{
       axios   
            .get(`https://kookr.herokuapp.com/api/recipes/user/${this.state.userId}`)
                .then(response =>{
                    this.setState({
                        recipes: response.data  
                    })
                })
                .catch(err =>{
                    console.log('Error fetching recipes by user Id', err);
                })        
    
    }
    ///Calendar functionality suite below
    //Gets and formats clicked calendar day
    dayClick = (clickedDay) =>{
        var MyDate = clickedDay;
        var MyDateString;
        MyDateString =  MyDate.getFullYear() + '/'
        + ('0' + (MyDate.getMonth()+1)).slice(-2) + '/'
        + ('0' + MyDate.getDate()).slice(-2) + '/'
        this.setState({
            date: MyDateString,
        })
    }
    //Sets  upcoming week from current day based on previous week schedule
    duplicatePreviousWeek = async() =>{
        await this.getWeek();
        await this.getRecipesForWeekArr();
        await this.postNextWeekRecipeArr();
       
         
    }
    getRecipesForWeekArr = async() =>{
        const userId = this.state.userId;
        const prevWeekArr = this.state.prevWeekArr;
        const prevWeekRecipeArr = []
        prevWeekArr.forEach(async date =>{
            // const date = date
            await axios
                .get(`https://kookr.herokuapp.com/api/schedule/user/${userId}/date/${encodeURIComponent(date)}`)
                    .then(res =>{
                        // console.log(res)////Figure out how this is returning recipes
                        if(!res.data.length){
                            prevWeekRecipeArr.push({name: 'No recipes for this day', date: date})
                        }else{
                            prevWeekRecipeArr.push(res.data)
                        } 
                    })
                    .catch(err =>{
                        prevWeekRecipeArr.push('No recipes for this day')
                    })
        
            })
        this.setState({
            prevWeekRecipeArr : prevWeekRecipeArr
        })
        console.log(this.state.prevWeekRecipeArr)
    }
    postNextWeekRecipeArr = () =>{
        const userId = this.state.userId;
        const prevWeekRecipeArr = this.state.prevWeekRecipeArr;
        let postArr = []
        console.log(prevWeekRecipeArr);
        prevWeekRecipeArr.forEach( recipe =>{
            if(typeof recipe === 'string'){
                const newRecipeObj = {recipe_id: null, user_id : userId, date : null, servings: null}
                // console.log(newRecipeObj)
                postArr.push(newRecipeObj)
            }else{
                const recipeId = recipe.recipe_id
                const date = recipe.date;
                const servings = recipe.servings
                const newRecipeObj = {recipe_id: recipeId, user_id : userId, date : date, servings: servings}
               postArr.push(newRecipeObj)
            }
        })
        postArr.forEach(recipePost =>{
            axios
                .post(`https://kookr.herokuapp.com/api/schedule`, recipePost)
                    .then(res =>{
                        console.log(res)
                    })
                    .catch(err =>{
                        console.log(err)
                    })
        })
    }

    //Gets previous and next weeks from current day
    getWeek = async() =>{
        //current date
        if(!this.state.date){
            alert('Please select a date first')
        }else{
            const currentDate = moment(this.state.date);
            const formattedCurrent = currentDate.clone().format('YYYY-MM-DD');
            const formattedCurrentPlus = currentDate.clone().add(1, 'days').format('YYYY-MM-DD');
            
            const endOfWeek = currentDate.clone().add(1, 'week').format('YYYY-MM-DD')
            const nextDates  = this.getDateArray(new Date(formattedCurrentPlus), new Date(endOfWeek));
            const nextWeekArr = nextDates.map(date =>{
                return this.formatDate(date)
            })

            const prevWeekStart = currentDate.clone().subtract(6, 'days').format('YYYY-MM-DD');
            const prevDates = this.getDateArray(new Date(prevWeekStart), new Date(formattedCurrent));                                                                                                          
            const prevWeekArr = prevDates.map(date =>{
                return this.formatDate(date)
            })
            await this.setState({
                prevWeekArr:prevWeekArr,
                nextWeekArr:nextWeekArr
            })
        }    

    //  console.log(this.state)
    }
    //Gets array of dates for week
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
      //formats date array into string format
      formatDate = (dateArr)=> {
            let year =  dateArr.getFullYear().toString();
            let month = '' + (dateArr.getMonth() + 1);
            let day = '' + (dateArr.getDate());
            if(month.length < 2) month = '0' + month
            if(day.length < 2) day = '0' + day
            // count = count + 1
            let returnDate = year + '/' + month + '/' +day
            // console.log(returnDate)
            return returnDate
    }

    //Search function for recipe search
    calendarSearchFunction = (event) =>{
        event.preventDefault();
        // const updatedArr = this.state.recipes;
        const testArr = this.state.testRecipes;
        const inputValue = event.target.value
        if(!event.target.value){
            this.setState({
                filteredRecipeArr : []
            })
        }else{
            const updatedArr = testArr.filter(element =>{
                return element.name.toLowerCase().includes(inputValue.toLowerCase())
            })
            this.setState({filteredRecipeArr: updatedArr});
        }
    }
     //Sets state for selected searched recipe  
    onSelectRecipe = async(selectedRecipe) =>{
        await this.setState({
            selectedRecipe: selectedRecipe
        });
        // console.log(this.state);
    }
    clickHandle = async(event,  type) =>{
        event.preventDefault();
        await this.setState({
            tag:type
        })
        console.log(this.state.tag);
    }
    duplicateClicked = () =>{
        this.setState({
            duplicate:true
        })
    }
    postToSchedule = () =>{

    }
    onSaveFunction = async(event) =>{
        event.preventDefault()
        if(this.state.duplicate){
            await  this.duplicatePreviousWeek();
        }
            await this.postToSchedule();
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
        // console.log(this.state.testRecipes);
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
                                                 {console.log(recipe.name)}
                                                <div onClick = {() =>this.onSelectRecipe(recipe)}>{recipe.name}</div>
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
                                    <input type="checkbox" id='check-box' className ='check-box' onClick = {this.duplicateClicked}/>
                                    
                                </div>    
                                <div className='edit-recipe-section'>  
                                    <div className="calendar-meal-tag-container">
                                        <h4 className='calendar-tag-header'>Select Tag to Add</h4>
                                        <div className='calendar-meal-tag-button-section'>
                                            <p className={`calendar-meal-tag ${this.state.tag === 'breakfast' ? 'selected' : '' }`} onClick={(e) =>this.clickHandle(e, 'breakfast')}>Breakfast</p>
                                            <p className={`calendar-meal-tag ${this.state.tag === 'lunch' ? 'selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'lunch')}>Lunch</p>
                                            <p className={`calendar-meal-tag ${this.state.tag === 'dinner' ? 'selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'dinner')}>Dinner</p>
                                            <p className={`calendar-meal-tag ${this.state.tag === 'dessert' ? 'selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'dessert')}>Dessert</p>
                                            <p className={`calendar-meal-tag ${this.state.tag === 'snack' ? 'selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'snack')}>Snack</p>
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
                                                    <p className={`calendar-meal-tag-mobile ${this.state.tag === 'breakfast' ? 'selected' : '' }`} onClick={(e) =>this.clickHandle(e, 'breakfast')}>Breakfast</p>
                                                    <p className={`calendar-meal-tag-mobile ${this.state.tag === 'lunch' ? 'selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'lunch')}>Lunch</p>
                                                    <p className={`calendar-meal-tag-mobile ${this.state.tag === 'dinner' ? 'selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'dinner')}>Dinner</p>
                                                    <p className={`calendar-meal-tag-mobile ${this.state.tag === 'dessert' ? 'selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'dessert')}>Dessert</p>
                                                    <p className={`calendar-meal-tag-mobile ${this.state.tag === 'snack' ? 'selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'snack')}>Snack</p>
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