import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import NavBar from './NavBar';
import {Link} from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import '../css/CalendarPage.css';
import {getRecipes} from '../actions/RecipeActions';
import {addAllToCalendar} from '../actions/CalendarActions';
import {bindActionCreators} from 'redux';

//const rangerDanger = extendMoment(Moment)



class CalendarPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            userId :   '' , 
            recipes : [],
            testRecipes: [],
            filteredRecipeArr : [],
            selectedRecipe : '',
            date: '',
            servings: '',
            prevWeekArr: [],
            nextWeekArr: [],
            prevWeekRecipeArr: [],
            nextWeekRecipeArr: [],
            tag: null,
            servingsModal:false,
            tagModal:false,
            duplicate:false,
            navigateModal:  false
         
        }
    }
    async componentDidMount(){
        const userId = localStorage.getItem('userId');
        await this.setState({
            userId : Number(userId)
     });
       this.recipeGetById();

        // this.props.getRecipes(this.props.user[0].user_id)
        // this.props.getRecipes(userId);
    }
          
    recipeGetById = async() =>{

       //not sure if this is necessary considering this.props.getRecipes()
       await axios   
            .get(`https://kookr.herokuapp.com/api/recipes/user/${this.state.userId}`)
                .then(async response =>{

                    await this.setState({
                        recipes: response.data  
                    })
                })
                .catch(err =>{
                    console.error('Error fetching recipes by user Id', err);
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
        await this.timeoutFunction();
        await this.setState({
            navigateModal:true
        })  
    }
    getRecipesForWeekArr = async() =>{
        const userId = this.state.userId;
        const prevWeekArr = this.state.prevWeekArr;
        const prevWeekRecipeArr = []

        await prevWeekArr.forEach(async date =>{
           await axios
                .get(`https://kookr.herokuapp.com/api/schedule/user/${userId}/date/${encodeURIComponent(date)}`)
                    .then(res =>{
                        if(!res.data.length){
                            prevWeekRecipeArr.push({name: 'No recipes for this day', date: date})
                        }else{
                            prevWeekRecipeArr.push(res.data)
                        } 
                    })
                    .catch(err =>{
                       console.error("Error: ",err)
                    })
            })
        await this.setState({
            prevWeekRecipeArr : prevWeekRecipeArr
        })
        
    }

    timeoutFunction = () =>{
        setTimeout(
            function(){
               this.postNextWeekRecipeArr();
            }.bind(this),1000
        )
    }
    postNextWeekRecipeArr = () =>{
        const userId = this.state.userId;
        const {prevWeekRecipeArr }= this.state;
        let postArr = []
        
        prevWeekRecipeArr.forEach((recipe, index )=>{    
            if(typeof recipe.name === 'string'){
                // Shouldn't need to post if blank
            }else {
                recipe.forEach(recipeMultiple =>{
                    const recipeId = recipeMultiple.recipe_id
                    let date = new Date(recipeMultiple.date);
                    date.setDate(date.getDate() + 8);
                    date = moment(date).format("YYYY-MM-DD");
                    const servings = recipeMultiple.servings
                    const newRecipeObj = {recipe_id: recipeId, user_id : userId, date : date, servings: servings, tag_id : recipeMultiple.tag_id}
                    postArr.push(newRecipeObj)
                })
            }
        })

        //AXIOS POST IS NOW IN THE CALENDAR ACTIONS

        postArr.forEach(async recipePost =>{
            await axios
                .post('https://kookr.herokuapp.com/api/schedule', recipePost)
                    .then(res =>{
                    })
                    .catch(err =>{
                        console.error(err)
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

            return returnDate
    }

    //Search function for recipe search
    calendarSearchFunction = (event) =>{
        //LINKED TO REDUCER 4-23
        
        const recipes = this.state.recipes
        const recipeArr = Object.values(recipes)
        
        event.preventDefault();
        // const testArr = this.state.testRecipes;
        const inputValue = event.target.value
        if(!event.target.value){
            this.setState({
                filteredRecipeArr : []
            })
        }else{
    
        let updatedArr = recipeArr.filter(element =>{
            return element.name.toLowerCase().includes(inputValue.toLowerCase())
        })
        this.setState({filteredRecipeArr: updatedArr});
    }
    }
     //Sets state for selected searched recipe  
    onSelectRecipe = async(selectedRecipe) =>{
        await this.setState({
            selectedRecipe: selectedRecipe,
            filteredRecipeArr: []
        });

    }
    clickHandle = async(event,  type) =>{
        event.preventDefault();
        await this.setState({
            tag:type
        })
    }
    duplicateClicked = () =>{
        this.setState({
            duplicate:true
        })
    }
    
    onSaveFunction = async(event) =>{
        event.preventDefault()
        if(this.state.duplicate){
            if(!this.state.date){
                alert('Please select a start date for week duplication')
            }else{
                await  this.duplicatePreviousWeek();
            }
        }else if(!this.state.date){
            alert('Please select a date')
        }else if(!this.state.selectedRecipe){
            alert('Please search and select a recipe befopre continuing')
        }else{

            await this.postToSchedule();
        }
            
    }

    convertTagToId = (tag) =>{
        let tagId = null
        if(tag === 'breakfast'){
            tagId = 1
            return tagId
        }else if(tag === 'lunch'){
            tagId = 2
            return tagId
        }else if(tag === 'dinner'){
            tagId = 3
            return tagId
        }else if(tag === 'dessert'){
            tagId = 4
            return tagId
        }else if(tag === 'snack'){
            tagId = 5
            return tagId
        }else{
            tagId = 6
            return tagId
        }
        
    }
    
    postToSchedule = () =>{
        const tag = this.state.tag;
        const tagId = this.convertTagToId(tag)

        const date = this.state.date;
        const userId = this.state.userId;
        let servings = Number(this.state.servings);
        const recipeId = this.state.selectedRecipe.recipe_id;
        if(servings === 0){
            servings = this.state.selectedRecipe.servings
        }
        const scheduleList = {date: date, user_id:userId, recipe_id: recipeId, servings: servings, tag_id :tagId}
    
            axios
                .post(`https://kookr.herokuapp.com/api/schedule`, scheduleList)
                    .then(res =>{

                    })
                    .catch(err =>{
                        console.error(err);
                    })
            
                 
    }
    servingsAdjustor = async (event) =>{
        await this.setState({
            [event.target.name] : event.target.value
        });
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
                                                <div className = 'searched-recipe' onClick = {() =>this.onSelectRecipe(recipe)}>{recipe.name}</div>
                                            </div>    
                                        )
                                    })}
                                </div>
                                <div className='selected-recipe-container'>
                                    <h3 className = 'selected-recipe-header'>You've Selected:</h3>
                                    <p className ='selected-recipe-name'>{this.state.selectedRecipe.name}</p>
                                </div>
                            </div>
                            <div className='servings-and-edit-section'>
                                <div className='servings-and-duplicate-container'>
                                    <p>How many servings?</p>
                                    <input className = 'servings-input'type="number" min="1" name = 'servings' value = {this.state.servings} onChange = {this.servingsAdjustor}/>
                                    <p className='check-box-p'>Duplicate previous week's shopping list</p>
                                    <input type="checkbox" id='check-box' className ='check-box' onClick = {this.duplicateClicked}/>
                                    
                                </div>    
                                <div className='edit-recipe-section'>  
                                    <div className="calendar-meal-tag-container">
                                        <h4 className='calendar-tag-header'>Select Tag to Add</h4>
                                        <div className='calendar-meal-tag-button-section'>
                                            <p className={`calendar-meal-tag ${this.state.tag === 'breakfast' ? 'calendar-selected' : '' }`} onClick={(e) =>this.clickHandle(e, 'breakfast')}>Breakfast</p>
                                            <p className={`calendar-meal-tag ${this.state.tag === 'lunch' ? 'calendar-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'lunch')}>Lunch</p>
                                            <p className={`calendar-meal-tag ${this.state.tag === 'dinner' ? 'calendar-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'dinner')}>Dinner</p>
                                            <p className={`calendar-meal-tag ${this.state.tag === 'dessert' ? 'calendar-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'dessert')}>Dessert</p>
                                            <p className={`calendar-meal-tag ${this.state.tag === 'snack' ? 'calendar-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'snack')}>Snack</p>
                                        </div>    
                                    </div>
                                </div>


                                <div className='servings-and-edit-section-mobile'>
                                    <h3 onClick = {this.openServingsModal} className='calendar-edit-header-mobile'>Edit servings</h3>
                                    <div className={this.state.servingsModal ? 'servings-modal-open'  : 'servings-modal-closed'}>
                                        <div className = 'calendar-servings-modal'>
                                            <div className='close-calendar-servings' onClick={this.closeServingsModal}>X</div>
                                            <p className='calendar-servings-p-mobile'>Select servings</p>
                                            <input className = 'calendar-servings-input-mobile'type="number" min="1" name = 'servings' value = {this.state.servings} onChange = {this.servingsAdjustor}/>
                                            <p className='calendar-duplicate-p-mobile'>Duplicate previous week's shopping list</p>
                                            <input type="checkbox" id='check-box' className ='check-box-mobile'/>
                                        </div> 
                                    </div>    
                                    <div className='edit-recipe-section-mobile'>  
                                        <h4 onClick ={this.openTagModal} className='calendar-tag-header-mobile'>Add Meal Tag</h4>
                                        <div className={this.state.tagModal ? 'tag-modal-open'  : 'tag-modal-closed'}>
                                            <div className='calendar-tag-modal'>
                                                <div className='close-calendar-tag-mobile' onClick={this.closeTagModal}>X</div>
                                                <div className='meal-tag-button-section'>
                                                    <div className={`calendar-meal-tag-mobile ${this.state.tag === 'breakfast' ? 'calendar-mobile-selected' : '' }`} onClick={(e) =>this.clickHandle(e, 'breakfast')}>
                                                        <p>Breakfast</p>
                                                        <img className = 'meal-tag-icon-mobile' src ='../images/fried-egg.png' alt='Breakfast'/>
                                                    </div>
                                                    <div className={`calendar-meal-tag-mobile ${this.state.tag === 'lunch' ? 'calendar-mobile-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'lunch')}>
                                                        <p>Lunch</p>
                                                        <img className = 'meal-tag-icon-mobile' src ='../images/salad.png' alt='Lunch'/>
                                                    </div>
                                                    <div className={`calendar-meal-tag-mobile ${this.state.tag === 'dinner' ? 'calendar-mobile-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'dinner')}>
                                                        <p>Dinner</p>
                                                        <img className = 'meal-tag-icon-mobile' src ='../images/fish.png' alt='Dinner'/>
                                                    </div>
                                                    <div className={`calendar-meal-tag-mobile ${this.state.tag === 'dessert' ? 'calendar-mobile-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'dessert')}>
                                                        <p>Dessert</p>
                                                        <img className = 'meal-tag-icon-mobile' src ='../images/cupcake.png' alt='Dessert'/>
                                                    </div>
                                                    <div className={`calendar-meal-tag-mobile ${this.state.tag === 'snack' ? 'calendar-mobile-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'snack')}>
                                                        <p>Snack</p>
                                                        <img className = 'meal-tag-icon-mobile' src ='../images/popcorn.png' alt='Snack'/>
                                                    </div>
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
                        <div className={this.state.navigateModal ? 'navigate-modal-open' : 'navigate-modal-closed'}>
                            <div className='navigate-modal'>   
                                <h2 className='navigate-modal-header'>Would you like to go to your Shopping List?</h2>
                                <div  className='navigate-button-container'>
                                    <Link to = "/grocery-list" className = 'leave-button'>Yes, take me there</Link>
                                    <div className='stay-button' onClick ={this.closeNavigateModal}>No, I'll stay here</div>
                                </div>
                            </div>     
                        </div>  
                    </div>        
                </div>
            </div>       
        )
    }
} 

const mapDispatchToProps = (dispatch) => bindActionCreators({getRecipes, addAllToCalendar}, dispatch)


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


export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage)