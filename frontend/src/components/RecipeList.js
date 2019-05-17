import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import  {getUser} from '../actions/UserActions';
import {addRecipeSch , UpdateScheduleByID, deleteRecipe, getRecipesByTag,addRecipe, addRecipeSuccess, getSelectedRecipe, getRecipes} from '../actions/RecipeActions';
import {addAllToCalendar} from '../actions/CalendarActions';
import {getTags} from '../actions/TagsActions';
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
            ], 
            userId: null,
            recipeIdArr: []
            
        }

    }   
    async componentDidMount() {

        this.props.getTags()
        let id = localStorage.getItem('userId');

        const userId = localStorage.getItem('userId');
        
        await this.setState({
             userId : Number(userId)
         });
        await this.props.getRecipes(id)
        await this.recipeGetById()
       
        // await this.getRecipeData();


}
recipeGetById = async() =>{
   
   //not sure if this is necessary considering this.props.getRecipes()
   await axios   
        .get(`https://kookr.herokuapp.com/api/recipes/user/${this.state.userId}`)
            .then(async response =>{
               
                const recipes = Object.values(response.data)
               
                await this.setState({
                    recipes: recipes 
                })
            
            })
            .catch(err =>{
                console.error('Error fetching recipes by user Id', err);
            })        
            
}


deleteSchedule = async (recId, userId) =>{
    
    await axios
        .get(`https://kookr.herokuapp.com/api/schedule/user/${userId}/recipe/${recId}`)
        .then( async (res) => {
            const data = res.data;
            data.forEach( (schedule) => {
                axios
                    .delete(`https://kookr.herokuapp.com/api/schedule/${schedule.id}`)
            })        
        })
        .catch( (err) => {
            console.error( "Could not delete scheduled entry: ", err);
        });
    // end axios
}

deleteRecipeButton = async(recipe_id) => {
   
    
    let recipe = {
        recipe_id: recipe_id
    }

    let userid = localStorage.getItem('userId');
    
    await this.props.deleteRecipe(recipe, userid)
    await this.deleteSchedule(recipe_id, userid);
}



filterRecipeButton = (tag) => {
    //need to link to user reducer
    let id = localStorage.getItem('userId');

    if(tag === 'all'){
        this.props.getRecipes(id)
    }else{
        this.props.getRecipesByTag(tag)
        this.props.getRecipes(id)
    }
    // this.props.getRecipesByTag(tag)
    // this.props.getRecipes(id)
}

filterAndCloseCombine = (tag, event) => {
    this.filterRecipeButton(tag)

    this.setState({
        filterModal:false
    })
    
}

canNotEdit() {
    alert('sorry this recipe website is not supported')
}

clickHandle = async(event,  type) =>{
    event.preventDefault();
    await this.setState({
        tag:type
    })
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

editRecipeButton = (scheduledDateID) => {
    // if(scheduledDateID === undefined) {
    //     this.props.addRecipeSch()
    // }

    let selectedTagId = this.props.tags[0].filter(tag => tag.tag === this.state.tag)
    
    let id = localStorage.getItem('userId');
    let stringUserId = id
    let stringTagID = selectedTagId[0].tag_id
    let stringRecipeId = this.state.selectedItem.recipe_id
    let date = this.state.dateChange
    if(!date){
        date = Date.now()
    }
        
    let scheduleObject = {
        recipe_id: stringRecipeId,
        user_id: stringUserId,
        tag_id: stringTagID,
        date: date,
        
    }
    
    // //does not work yet
     if(scheduledDateID === undefined) {
     this.props.addRecipeSch(scheduleObject)
    //  this.props.UpdateScheduleByID(scheduledDateID, scheduleObject)
     }else{
        
        this.props.UpdateScheduleByID(scheduledDateID, scheduleObject)
        this.props.getRecipes(id)
     }

    
    

    //this.props.UpdateScheduleByID(scheduledDateID, scheduleObject)
    

    //this.props.addAllToCalendar()
    this.editModalClose()
}

onChangeDate = (event) =>{
    this.setState({
        dateChange : event.target.value
    })
}
cutterHeaderOff = (string) =>{
    return (string.length > 30 ? string.slice(0, 30) + '...' : string)
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
                                                    <img className = 'filter-meal-tag-icon' src ='../images/fried-egg.png' alt='Breakfast'/>
                                                </div>
                                            </div>
                                            <div className={`filter-meal-tag ${this.state.tag === 'lunch' ? 'filter-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'lunch')}>
                                                <div className='filter-meal-tag-sub'>  
                                                    <p className = 'filter-meal-tag-p'>Lunch</p>
                                                    <img className = 'filter-meal-tag-icon' src ='../images/salad.png' alt='Lunch'/>
                                                </div>
                                            </div>
                                            <div className={`filter-meal-tag ${this.state.tag === 'dinner' ? 'filter-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'dinner')}>
                                                <div className='filter-meal-tag-sub'>
                                                    <p className = 'filter-meal-tag-p'>Dinner</p>
                                                    <img className = 'filter-meal-tag-icon' src ='../images/fish.png' alt='Dinner'/>
                                                </div>
                                            </div>
                                            <div className={`filter-meal-tag ${this.state.tag === 'dessert' ? 'filter-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'dessert')}>
                                                <div className='filter-meal-tag-sub'>
                                                    <p className = 'filter-meal-tag-p'>Dessert</p>
                                                    <img className = 'filter-meal-tag-icon' src ='../images/cupcake.png' alt='Dessert'/>
                                                </div>
                                            </div>
                                            <div className={`filter-meal-tag ${this.state.tag === 'snack' ? 'filter-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'snack')}>
                                                <div className='filter-meal-tag-sub'>
                                                    <p className = 'filter-meal-tag-p'>Snack</p>
                                                    <img className = 'filter-meal-tag-icon' src ='../images/popcorn.png' alt='Snack'/>
                                                </div>
                                            </div>
                                            <div className={`filter-meal-tag ${this.state.tag === 'all' ? 'filter-selected' : '' }`} onClick={(e) => this.clickHandle(e, 'all')}>
                                                <div className='filter-meal-tag-sub'>
                                                    <p className = 'filter-meal-tag-p'>Select All</p>
                                                </div>
                                            </div>  
                                        </div>
                                        <div className='filter-modal-submit-button' onClick={() => this.filterAndCloseCombine(this.state.tag)} >Submit</div>
                                    </div> 
                                </div>
                            </div>
                        <div className="recipe-list">
                            {this.props.recipes.map((item) => (
                            <div key={item.name} className='recipe-card'>
                                <Link  className ='recipe-link' to={`/recipes/${item.recipe_id}`} >
                                    <div className='recipe-card-header'>{this.cutterHeaderOff(item.name)}</div>
                                </Link>
                                <div className= 'recipe-card-img-container'>
                                    <img className = {item.image ? 'recipe-card-img' : 'recipe-card-img chef'} src = {item.image ? item.image : '../images/logo-white.png'} alt ='recipe-list'/>
                                </div>
                                <div className = 'recipe-card-time'>
                                    { item.bestdate ? new Intl.DateTimeFormat('en-US', {
                                        year: 'numeric',
                                        day: '2-digit',
                                        month: 'long'
                                    }).format(new Date(`${item.bestdate.date}`)) : 'Not Scheduled'}
                                </div>
                                <div className = 'recipe-card-meal-tag'>{item.bestdate ? item.bestdate.tag : 'No tag provided'}</div>
                                <div className='recipe-card-button-container'>
                                {/* //item.bestdate.user_id === undefined ? () => this.canNotEdit() : */}
                                   <div onClick={  () => this.editModalOpen(item)} className='recipe-card-edit-button'>Edit</div>
                                    <div className="recipe-card-delete-button"  onClick={() => this.deleteRecipeButton(item.recipe_id)} >Delete</div>
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
                                                        <img className = 'edit-meal-tag-icon' src ='../images/fried-egg.png' alt='Breakfast'/>
                                                    </div>
                                                </div>
                                                <div className={`edit-meal-tag ${this.state.tag === 'lunch' ? 'edit-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'lunch')}>
                                                    <div className='edit-meal-tag-sub'>  
                                                        <p className = 'edit-meal-tag-p'>Lunch</p>
                                                        <img className = 'edit-meal-tag-icon' src ='../images/salad.png' alt='Lunch'/>
                                                    </div>
                                                </div>
                                                <div className={`edit-meal-tag ${this.state.tag === 'dinner' ? 'edit-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'dinner')}>
                                                    <div className='edit-meal-tag-sub'>
                                                        <p className = 'edit-meal-tag-p'>Dinner</p>
                                                        <img className = 'edit-meal-tag-icon' src ='../images/fish.png' alt='Dinner'/>
                                                    </div>
                                                </div>
                                                <div className={`edit-meal-tag ${this.state.tag === 'dessert' ? 'edit-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'dessert')}>
                                                    <div className='edit-meal-tag-sub'>
                                                        <p className = 'edit-meal-tag-p'>Dessert</p>
                                                        <img className = 'edit-meal-tag-icon' src ='../images/cupcake.png' alt='Dessert'/>
                                                    </div>
                                                </div>
                                                <div className={`edit-meal-tag ${this.state.tag === 'snack' ? 'edit-selected' : '' }`}  onClick={(e) => this.clickHandle(e, 'snack')}>
                                                    <div className='edit-meal-tag-sub'>
                                                        <p className = 'edit-meal-tag-p'>Snack</p>
                                                        <img className = 'edit-meal-tag-icon' src ='../images/popcorn.png' alt='Snack'/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className ='edit-modal-submit-button' onClick={() => this.editRecipeButton(this.state.selectedItem.bestdate.id)}  >Submit</div>
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

const mapDispatchToProps = (dispatch) => bindActionCreators({addRecipeSch, getTags, UpdateScheduleByID, addAllToCalendar,deleteRecipe, getRecipes, getUser, addRecipe, addRecipeSuccess, getSelectedRecipe, getRecipesByTag}, dispatch)

const mapStateToProps = state => {

    return {
        user: state.UserReducer.user,
        recipes: state.RecipeReducer.recipes,
        calendar: state.CalendarReducer.calendar,
        tags: state.TagsReducer.tags
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)


