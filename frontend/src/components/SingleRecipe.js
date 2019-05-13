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

 
   
componentWillMount() {
    

    let userid = this.props.user[0].user_id
 let recipe_id = this.props.match.params.id
 
//  try {
//     await this.props.getRecipesByIDSTART(recipe_id, userid)
   
   
//    console.log(this.props.recipes)
   
//    } catch (err ) {
//        console.log(err)
//    }
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
//this.props.getCalendarItem(sendingObject)
//this.props.getTags(tagObject)
try {
 await this.props.getRecipesByIDSTART(recipe_id, userid)


console.log(this.props.recipes)

} catch (err ) {
    console.log(err)
}
  

 


}

componentWillReceiveProps() {



}

 componentDidUpdate(prevProps) {
    console.log(this.state)
    console.log(prevProps.recipes, this.props.recipes)
    if( prevProps.recipes.length !== this.props.recipes.length) {
        console.log(this.state)
        let directions = this.props.recipes[0]
        console.log(directions)

      
    //      this.setState({
    //     //     name: this.props.recipes[0].name,
    //     //     link: this.props.recipes[0].link,
    //     //     cook_time: this.props.recipes[0].cook_time,
    //     //     image: this.props.recipes[0].image,
    //     //     prep_time: this.props.recipes[0].prep_time,
    //     //     recipe_id: this.props.recipes[0].recipe_id,
    //     //     servings: this.props.recipes[0].servings,
    //          directions: [this.props.recipes[0].directions],
    //          ingredients: [this.props.recipes[0].ingredients],
    //     //     bestdate: [this.props.recipes[0].bestdate]
    //      })
   
    }
   
}
clicked = async(index) =>{
    const clicked = this.state.directionsClicked
    if(clicked.includes(index)){
        await this.setState({
            directionsClicked: [...this.state.directionsClicked.filter(item => item !==  index)]
        })
    }else{
        await this.setState({
            directionsClicked : [...this.state.directionsClicked, index]
        })
    }
    console.log(this.state.directionsClicked)
}



    render(){


       
        return (
            <div className= "SingleRecipe"> 
                <NavBar />

                <div className ='single-recipe-page-container'>
                    {this.props.recipes.map((item) => (
                        
                //Here div
                <div>    
                    <iframe src = {item.link} className = {item.link.includes('allrecipes') || item.link.includes('pinchofyum') ? 'iframe-no-show' : 'iframe-show'} />

                    <div className = {item.link.includes('allrecipes') || item.link.includes('pinchofyum') ? 'single-recipe-page-sub' : 'single-recipe-page-sub-none'}>
                        <div className = 'column-one'>
                            <div className='column-one-sub'>
                                <div className = 'name-and-link-container'>
                                    <div className="single-recipe-name">{item.name}</div>
                                    <button className='single-recipe-link' href={`${item.link}`}>LINK</button>
                                </div>
                                <div className ='image-and-schedule-container'>
                                    <div className ='single-recipe-image-container'>

                                        <img className="recipe-image" src={item.image} />

                                    </div>
                                    <div className='scheduled-container'>
                                        <img className='cookbook-img' src='../images/cookbook.png' alt='' />
                                        <div>
                                            <div className="single-recipe-tag">{item.bestdate.tag}</div>
                                            <div className="single-recipe-date" >
                                           
                                            {item.bestdate.date !== undefined ? 
                                            new Intl.DateTimeFormat('en-US', {
                                                 year: 'numeric',
                                                 day: '2-digit',
                                                 month: 'long'
                                            }).format(new Date(item.bestdate.date))
                                            :'need date'
                                        }
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
                                                <div className ='single-recipe-prep-time'>{item.prep_time}</div>
                                            </div>
                                            <div className='recipe-info'>
                                                <div className='single-recipe-cook-time-header recipe-info-header'>Cook Time</div>
                                                <div>{item.cook_time}</div>
                                            </div>
                                            <div className='recipe-info'>
                                                <div className='single-recipe-servings-header recipe-info-header'>Servings</div>
                                                <div className = 'single-recipe-servings'>{item.servings}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='recipe-ingredients-container'>
                                        <h3 className='recipe-ingredients-header'>Ingredients</h3>
                                        <div className = 'recipe-ingredients'>
                                        
                                        {/* {this.state.ingredients.map((ing) => <div className="ingredient" key={ing.id} > {ing.amount} {ing.measurement} {ing.name}</div>) } */}
                                            {
                                                item.ingredients !== undefined ? 
                                                item.ingredients.map(item => <div className="ingredient" key={item.id} > {item.amount} {item.measurement} {item.name}</div>) 
                                                : 'Loading...'
                                                }
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

                                            {
                                                item.directions !== undefined ?
                                                item.directions.map(item => <div className="directions" key={item.order}>{item.directions}</div>) 
                                                : "Loading..."
                                            }

                                        </div>
                                    </div>    
                                </div>
                            </div>      
                        </div>
                        
                   
                    </div>  
                </div>    
                     ))}  
            </div>
        </div>         
        )
    }
} 

const mapDispatchToProps = (dispatch) => bindActionCreators({getRecipesByIDSTART, getRecipes,getScheduleItems, getDirections, getIngredients, getSelectedRecipe, getCalendarItem, getTags}, dispatch)

const mapStateToProps = state => {
   
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
