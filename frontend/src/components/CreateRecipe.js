import React from 'react';
import '../css/CreateRecipe.css';
import axios from 'axios';
import  '../css/CreateRecipe.css';
import NavBar from './NavBar';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { addDirections } from '../actions/DirectionsActions';
import { addIngredients } from '../actions/IngredientsActions';
import { addRecipeIngredients } from '../actions/RecipeIngredientsActions';
import { addRecipe } from '../actions/RecipeActions';
import { addTag } from '../actions/TagsActions';

import Calendar from 'react-calendar'


class CreateRecipe extends React.Component{
  constructor(props){
      super(props)
      
      this.state = {
        recipeUrl: '',
        userId: '', 
        tagModal: false,
        tag: null,
        tagId:null,
        recipe: [],
        recipeData : [],
        testRecipe: [],
        testRecipeData : [],
        servings: '',
        calendarModal:false,
        date: ''
      }
  }
 componentDidMount(){
    const userId = localStorage.getItem('userId');
    this.setState({
         userId : userId
     });
     this.testGetRecipe();
 }

 dropHandler = event =>{
      const url = event.dataTransfer.getData('text');
      console.log(url)
    this.setState({
        recipeUrl : url
    })
    console.log(this.state.recipeUrl)
}
postRecipe = (event) =>{
    event.preventDefault();
    const userId = Number(this.state.userId)
    const recipeAndUser = { name : '', user_id : userId, link : `${this.state.recipeUrl}`};
    // const newRecipeObj = Object.assign({},recipeAndUser);
    // console.log(newRecipeObj);
    axios
        .post('https://kookr.herokuapp.com/api/recipes', recipeAndUser)
            .then(response =>{
                console.log(response);
                this.setState({
                    recipe : response.data ///Make sure that is right
                })
            })
            .catch(err =>{
                console.log('Could not add new recipe obj', err);
            })
    
}
testGetRecipe = async() =>{
    await axios
        .get(`https://kookr.herokuapp.com/api/recipes/user/1`)
            .then(res =>{
                this.setState({
                    testRecipe : [ ...Object.values(res.data)]
                }) 
                 
            })
            .catch(err =>{
                console.log(err);
            })
    await axios
        .get('https://kookr.herokuapp.com/api/recipes/1')
            .then(res =>{
                this.setState({
                    testRecipeData : [...Object.values(res.data)]
                })
            })
            .catch(err =>{
                console.log(err)
            })
}
dayClick = (clickedDay) =>{
    var MyDate = clickedDay;
    var MyDateString;
    MyDateString = MyDate.getFullYear() + '/'
    + ('0' + (MyDate.getMonth()+1)).slice(-2) + '/'
    + ('0' + MyDate.getDate()).slice(-2)
    this.setState({
        date: MyDateString
    });
}

clickHandle = async(event,  type) =>{
    event.preventDefault();
    await this.setState({
        tag:type
    })
    console.log(this.state.tag);
}

// postTagToRecipe = () =>{
//     const tag = this.state.tag;
//     // const recipeId = this.state.recipe.recipe_id;
//     const recipeId = 2
//     axios
//         .post(`https://kookr.herokuapp.com/api/tags/recipe/${recipeId}`, {tag : tag})
//             .then(res =>{
//                 console.log(res)
//                 // this.setState({
//                 //     tagId : res.data.tag_id
//                 // })
//             })
//             .catch(err =>{
//                 console.log('Error adding tag to recipe by id', err)
//             })
// }


postToSchedule = () =>{
    const date = this.state.date;
    const userId = Number(this.state.userId);
    const servings = Number(this.state.servings);
    // const recipeId = this.state.recipe.recipe_id;
    const recipeId = 1;
    // const tagId = this.state.tagId;
    const tagId = this.state.tag;
    const scheduleList = {date: date, user_id:userId, recipe_id: recipeId, servings: servings, tag_id :tagId}
    // const newScheduleObj = Object.assign({}, scheduleList);
    // console.log(newScheduleObj);
    console.log(scheduleList)
    axios
        .post('https://kookr.herokuapp.com/api/schedule/', scheduleList)
            .then(res =>{
                console.log(res);
            })
            .catch(err =>{
                console.log(err);
            })
}
postsOnSubmit = () =>{
    // this.postTagToRecipe();
    this.postToSchedule();
}
servingsAdjustor = async (event) =>{
    await this.setState({
        [event.target.name] : event.target.value
    });
    console.log(this.state.servings); 
}
openTagsMobile = () =>{
    this.setState({
        tagModal : true
    })
}
closeTagsMobile = () =>{
    this.setState({
        tagModal : false
    })
}
openCalendarMobile = () =>{
    this.setState({
        calendarModal: true
    })
}
closeCalendarMobile = () =>{
    this.setState({
        calendarModal: false
    })
}

    render(){
        const {testRecipe} = this.state
        console.log(this.state);
        const {testRecipeData} = this.state
        return(
            <div className='Create-Recipe'>
                <NavBar /> 
                <div className='create-page-container'>
                    <div className='create-page-sub-container'>
                        <div className ='create-intro-container'>
                            <h2 className='create-recipe-header'>Add Your Recipes!</h2>
                            <p className='create-recipe-p'>Drag and drop, or copy and paste the link to your favorite recipe below, click the add button, and designate a mealtime, date, and serving size.</p>
                        </div>
                        <div className='url-add-recipe-section'> 
                            <input 
                                className='url-drop-input' 
                                placeholder='  Drag and Drop Recipe URL Here'
                                onDrop={this.dropHandler}/>
                            <div onClick = {this.postRecipe} className='url-add'>Add</div>        
                        </div>
                        <div className='recipe-preview'>
                            <div className='recipe-preview-title-and-info'>
                                <h3 className='recipe-preview-header'>{testRecipe.length ? testRecipe[0].name : ''}</h3>
                                <div className='recipe-info-container'>  
                                    <div className='prep-time-container'>
                                        <p className='prep-time'>Prep Time:</p>
                                        <p>{`${testRecipeData.length ? testRecipeData[4]: ''} min`} </p>
                                    </div>
                                    <div className='cook-time-container'>
                                        <p className = 'cook-time'>Cook Time:</p>
                                        <p> {`${testRecipeData.length ? testRecipeData[5] : ''} min`}</p>
                                    </div>
                                    <div className='servings-amount-container'>
                                        <p className ='servings-amount'>Servings:</p>
                                        <p> {`${testRecipeData.length ? testRecipeData[6] : ''}`}</p>
                                    </div>
                                </div>
                                <div className='recipe-preview-image'>
                                    <div className ='recipe-image-sub'>
                                    <img className ='recipe-preview-img'src ={testRecipeData.length ? testRecipeData[2] : ''} alt ='recipe-img' />
                                </div> 
                            </div>      
                            </div>
                            <div className='meal-tag-section'>
                                <h3 className='meal-tag-header'>For which meal?</h3>
                                <div className={`meal-tag ${this.state.tag === 'breakfast' ? 'selected' : '' }`} onClick={(e) =>this.clickHandle(e, 0)}>
                                    <div className='meal-tag-sub'>
                                        <p className ='meal-tag-p'>Breakfast</p>
                                        <img className = 'meal-tag-icon' src ='../images/fried-egg.png'/>
                                    </div>
                                </div>
                                <div className={`meal-tag ${this.state.tag === 'lunch' ? 'selected' : '' }`}  onClick={(e) => this.clickHandle(e, 1)}>
                                    <div className='meal-tag-sub'>  
                                        <p className = 'meal-tag-p'>Lunch</p>
                                        <img className = 'meal-tag-icon' src ='../images/salad.png'/>
                                    </div>
                                </div>
                                <div className={`meal-tag ${this.state.tag === 'dinner' ? 'selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'dinner')}>
                                    <div className='meal-tag-sub'>
                                        <p className = 'meal-tag-p'>Dinner</p>
                                        <img className = 'meal-tag-icon' src ='../images/fish.png'/>
                                    </div>
                                </div>
                                <div className={`meal-tag ${this.state.tag === 'dessert' ? 'selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'dessert')}>
                                    <div className='meal-tag-sub'>
                                        <p className = 'meal-tag-p'>Dessert</p>
                                        <img className = 'meal-tag-icon' src ='../images/cupcake.png'/>
                                    </div>
                                </div>
                                <div className={`meal-tag ${this.state.tag === 'snack' ? 'selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'snack')}>
                                    <div className='meal-tag-sub'>
                                        <p className = 'meal-tag-p'>Snack</p>
                                        <img className = 'meal-tag-icon' src ='../images/popcorn.png'/>
                                    </div>
                                </div>
                            </div>
                            <div className='meal-tag-mobile-button'>
                                <h3 className='meal-tag-header-mobile' onClick = {this.openTagsMobile}>Add Meal Tag</h3>
                                    <div className= {this.state.tagModal ? 'meal-tag-modal-mobile-open' : 'meal-tag-modal-mobile-closed'}>
                                        <div className='meal-tag-modal-sub'>
                                            <div className='meal-tag-close' onClick={this.closeTagsMobile}>X</div>
                                            <div className={`meal-tag-mobile ${this.state.tag === 'breakfast' ? 'selected-mobile' : '' }`} onClick={(e) =>this.clickHandle(e, 'breakfast')}>
                                                <p>Breakfast</p>
                                                <img className = 'meal-tag-icon-mobile' src ='../images/fried-egg.png'/>
                                            </div>
                                            <div className={`meal-tag-mobile ${this.state.tag === 'lunch' ? 'selected-mobile' : '' }`}  onClick={(e) => this.clickHandle(e, 'lunch')}>
                                                <p>Lunch</p>
                                                <img className = 'meal-tag-icon-mobile' src ='../images/salad.png'/>
                                            </div>
                                            <div className={`meal-tag-mobile ${this.state.tag === 'dinner' ? 'selected-mobile' : '' }`}  onClick={(e) => this.clickHandle(e, 'dinner')}>
                                                <p>Dinner</p>
                                                <img className = 'meal-tag-icon-mobile' src ='../images/fish.png'/>
                                            </div>
                                            <div className={`meal-tag-mobile ${this.state.tag === 'dessert' ? 'selected-mobile' : '' }`}  onClick={(e) => this.clickHandle(e, 'dessert')}>
                                                <p>Dessert</p>
                                                <img className = 'meal-tag-icon-mobile' src ='../images/cupcake.png'/>
                                            </div>
                                            <div className={`meal-tag-mobile ${this.state.tag === 'snack' ? 'selected-mobile' : '' }`}  onClick={(e) => this.clickHandle(e, 'snack')}>
                                                <p>Snack</p>
                                                <img className = 'meal-tag-icon-mobile' src ='../images/popcorn.png'/>
                                            </div>
                                        </div>    
                                    </div>
                            </div>
                            <div className='calendar-mobile'>
                                <h3  className = 'calendar-modal-click-header' onClick={this.openCalendarMobile}>Add Recipe to Calendar</h3>
                                <div className={this.state.calendarModal ? 'calendar-mobile-open' : 'calendar-mobile-closed'}>
                                    <div className= 'mobile-calendar-modal'>
                                        <div className= 'mobile-calendar-header-section'>
                                            <h3 className ='mobile-calendar-header'>Select Date</h3>
                                            <div onClick = {this.closeCalendarMobile}className='close-mobile-calendar'>X</div>
                                        </div>
                                       
                                        <Calendar calendarType = {'US'} onClickDay = {this.dayClick}/>
                                        <div className='servings-container-mobile'>
                                            <p className='edit-servings-p-mobile'>How many servings?</p>
                                            <input className ='servings-input-mobile' name = 'servings' value = {this.state.servings} onChange = {this.servingsAdjustor} type="number" min="1" /> 
                                        </div>
                                    </div>    
                                </div>    
                            </div>
                            <div className='add-recipe-button-mobile' onClick={this.postTagToRecipe}> Save </div>
                        </div>     
                        <div className='recipe-modification-section'>
                            <div className='calendar-section'>
                                <h4 className='calendar-directions-header'>Select a calendar date to assign your recipe to.</h4>
                                <Calendar calendarType = {'US'} onClickDay = {this.dayClick} className='create-page-calendar'/>
                            </div>
                            <div className='edit-servings-section'>
                                <div className='servings-container'>
                                    <h3 className='edit-servings-header'>Select a serving amount to be applied to this recipe on your shopping list.</h3>
                                    <p className='edit-servings-p'>How many servings?</p>
                                    <input className ='servings-input' name = 'servings' value = {this.state.servings} onChange = {this.servingsAdjustor} type="number" min="1" /> 
                                </div>
                                <div className='add-recipe-button' onClick={this.postsOnSubmit}> Save </div> 
                            </div>
                        </div>
                    </div>    
                </div>           
            </div>
        )
    }
}

const mapDispatchtoProps = (dispatch) => bindActionCreators({addDirections, addIngredients, addRecipe, addRecipeIngredients, addTag},dispatch)

const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.UserReducer.user,
        recipes: state.RecipeReducer.recipes,
        directions: state.DirectionsReducer.directions,
        recipeingredients: state.RecipeIngredientsReducer.recipeingredients,
        ingredients: state.IngredientsReducer.ingredients,
        tags: state.TagsReducer.tags,
        calendar: state.CalendarReducer.calendarItems
    }
}


export default connect(mapStateToProps, mapDispatchtoProps)(CreateRecipe)

