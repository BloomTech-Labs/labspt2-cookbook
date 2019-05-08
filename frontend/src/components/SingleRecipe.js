import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { GET_DIRECTIONS, getDirections } from '../actions/DirectionsActions';
import { getIngredients } from '../actions/IngredientsActions';
import {getRecipesByIDSTART, getRecipes, getSelectedRecipe } from '../actions/RecipeActions';
import { getCalendarItem,getScheduleItems } from '../actions/CalendarActions';
import { getTags } from '../actions/TagsActions';
import {bindActionCreators} from 'redux';
import NavBar from "./NavBar";
import '../css/SingleRecipe.css';


class SingleRecipe extends Component{

        
        state = { 
            name: '',
            link: '',
            cook_time: '',
            image: '',
            prep_time: '',
            recipe_id: '',
            servings: '',
            directions: [],
            ingredients: [],
            // name: this.props.recipes.name,
            // link: this.props.recipes.link,
            // cook_time: this.props.recipes.cook_time,
            // image: this.props.recipes.image,
            // prep_time: this.props.recipes.prep_time,
            // recipe_id: this.props.recipes.recipe_id,
            // servings: this.props.recipes.servings,
            // directions: ['any string'],
            // ingredients: ['any string2'],
            bestdate: [this.props.recipes.bestdate]
        }   
   
componentWillMount() {
    
    let userid = this.props.user[0].user_id
 let recipe_id = this.props.match.params.id
 
//  this.props.getRecipeById(recipe_id, userid)
}

async componentDidMount()
   
    {

 let userid = this.props.user[0].user_id
 let recipe_id = this.props.match.params.id
 let sendingObject = {
    recipe_id: this.props.match.params.id 
}
let tagObject = {
    tag_id: this.props.calendar[0].tag_id
}
this.props.getCalendarItem(sendingObject)
this.props.getTags(tagObject)
try {
await this.props.getRecipesByIDSTART(recipe_id, userid)


console.log(this.props.recipes)

} catch (err ) {
    console.log(err)
}
// this.props.getRecipeById(recipe_id, userid)
        
 
    // this.props.getRecipes(userid)
       
    //     let id = 1
       
    //get the calendarItem for the selected object
//    await this.props.getCalendarItem(sendingObject)
    //assigns the newly created calendar state and pulls the tag id for that scheduled item
    
    // get the word for that tag from the tag reducer and sets that tag as state.
//    await this.props.getTags(tagObject)

   // this.props.getScheduleItems()
   
    

    //  let recipeid = this.props.match.params.id
   

axios.get(`https://kookr.herokuapp.com/api/recipes/${recipe_id}`).then(res => {

    console.log(res)

   
    this.setState({
        name: res.data.name, 
        link: res.data.link, 
        cook_time: res.data.cook_time, 
        image: res.data.image, 
        prep_time: res.data.prep_time,
        recipe_id: res.data.recipe_id,  
        servings: res.data.servings,
        directions: res.data.directions,
        ingredients: res.data.ingredients,
        bestdate: []       
    })
    
})
}

async componentDidUpdate(prevProps) {
    console.log(prevProps.recipes, this.props.recipes)
    if( prevProps.recipes.length !== this.props.recipes.length) {
        await this.setState({
            // name: this.props.recipes[0].name,
            // link: this.props.recipes[0].link,
            // cook_time: this.props.recipes[0].cook_time,
            // image: this.props.recipes[0].image,
            // prep_time: this.props.recipes[0].prep_time,
            // recipe_id: this.props.recipes[0].recipe_id,
            // servings: this.props.recipes[0].servings,
            // directions: [...this.state.directions, this.props.recipes[0].directions],
            // ingredients: [...this.state.ingredients, this.props.recipes[0].ingredients],
            bestdate: [this.props.recipes[0].bestdate]
        })
        console.log(this.state)
        console.log(Object.entries(this.props.recipes[0]))
    }
    console.log(this.state)
}



    render(){
        console.log(this.props)
        return (
            <div className="SingleRecipe"> 
                <NavBar />
                <div className ='single-recipe-page-container'>
                    <div className = 'single-recipe-page-sub'>
                        <div className = 'column-one'>
                            <div className='column-one-sub'>
                                <div className = 'name-and-link-container'>
                                    <div className="single-recipe-name">{this.state.name}</div>
                                    <button className='single-recipe-link' href={`${this.state.link}`}>LINK</button>
                                </div>
                                <div className ='image-and-schedule-container'>
                                    <div className ='single-recipe-image-container'>
                                        <img className="recipe-image" src={this.state.image} alt=''/>
                                    </div>
                                    <div className='scheduled-container'>
                                        <img className='cookbook-img' src='../images/cookbook.png' alt='' />
                                        <div>
                                            <div className="single-recipe-tag">{this.props.tags[0].tag}</div>
                                            <div className="single-recipe-date" >{this.state.bestdate.date}
                                            {/* {new Intl.DateTimeFormat('en-US', {
                                                 year: 'numeric',
                                                 day: '2-digit',
                                                 month: 'long'
                                            }).format(new Date(`${this.state.bestdate.date}`))} */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='recipe-and-ingredients'>
                                    <div className='single-recipe-info'>
                                        <h3 className='recipe-info-main-header'>Info</h3>
                                        <div className ='single-recipe-info-sub'>
                                            <div className='recipe-info'> 
                                                <div className ='single-recipe-prep-time-header recipe-info-header'>Prep Time</div>
                                                <div className ='single-recipe-prep-time'>{this.state.prep_time}</div>
                                            </div>
                                            <div className='recipe-info'>
                                                <div className='single-recipe-cook-time-header recipe-info-header'>Cook Time</div>
                                                <div>{this.state.cook_time}</div>
                                            </div>
                                            <div className='recipe-info'>
                                                <div className='single-recipe-servings-header recipe-info-header'>Servings</div>
                                                <div className = 'single-recipe-servings'>{this.state.servings}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='recipe-ingredients-container'>
                                        <h3 className='recipe-ingredients-header'>Ingredients</h3>
                                        <div className = 'recipe-ingredients'>
                                            {this.state.ingredients === [] ? this.state.ingredients.map(item => <div className="ingredient" key={item.id} > {item.amount} {item.measurement} {item.name}</div>) : 'loading...'}
                                        </div>
                                    </div>
                                </div>
                            </div>        
                        </div>
                        <div className='column-two'>
                            <div className='column-two-sub'>
                                <div className='recipe-directions-container'>
                                    <div  className='recipe-directions-sub'>
                                        <h3 className='directions-header'>Directions</h3>
                                        <div className='recipe-directions'>
                                            {this.state.directions === [] ? this.state.directions.map(item => <div className="directions" key={item.order}>{item.directions}</div>) : 'loading...'}
                                        </div>
                                    </div>    
                                </div>
                            </div>      
                        </div>
                    </div>    
            </div>
        </div>         
        )
    }
} 

const mapDispatchToProps = (dispatch) => bindActionCreators({getRecipesByIDSTART, getRecipes,getScheduleItems, getDirections, getIngredients, getSelectedRecipe, getCalendarItem, getTags}, dispatch)

const mapStateToProps = state => {
    //console.log(state.RecipeReducer.recipes.directions)
    return {
        user: state.UserReducer.user,
        recipes: state.RecipeReducer.recipes,
        directions: state.DirectionsReducer.directions,
        recipeingredients: state.RecipeIngredientsReducer.recipeingredients,
        ingredients: state.IngredientsReducer.ingredients,
        calendar: state.CalendarReducer.calendar,
        tags: state.TagsReducer.tags
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipe)
