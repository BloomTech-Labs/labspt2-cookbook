import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDirections } from '../actions/DirectionsActions';
import { getIngredients } from '../actions/IngredientsActions';
import {getRecipesByIDSTART, getRecipes, getSelectedRecipe } from '../actions/RecipeActions';
import { getCalendarItem,getScheduleItems } from '../actions/CalendarActions';
import { getTags } from '../actions/TagsActions';
import {bindActionCreators} from 'redux';
import NavBar from "./NavBar";
import '../css/SingleRecipe.css';


class SingleRecipe extends Component{
    constructor(){
        super()
        this.state = {
            directionsClicked: []
        }
    }
 

async componentDidMount()
   
    {

 let userid = localStorage.getItem('userId');   
 let recipe_id = this.props.match.params.id

try {
 await this.props.getRecipesByIDSTART(recipe_id, userid)


} catch (err ) {
    console.error(err)
}
  

 


}

componentWillReceiveProps() {



}

 componentDidUpdate(prevProps) {

    if( prevProps.recipes.length !== this.props.recipes.length) {

        let directions = this.props.recipes[0]

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

}



    render(){
        return (
            <div className= "SingleRecipe"> 
                <NavBar />

                <div className ='single-recipe-page-container'>
                    {this.props.recipes.map((item) => (
                        
                //Here div
                <div>    
                    <iframe title='recipe' src = {item.link} className = {item.link.includes('allrecipes') || item.link.includes('pinchofyum') || item.link.includes('delish.com')? 'iframe-no-show' : 'iframe-show'} />
                    <div className ={item.link.includes('delish.com') ? 'edge-case' : 'edge-case-no-show'}> 
                        <div className ='single-recipe-error-container'>
                            <h2 className ='single-recipe-error-header'>The recipe you requested cannot be viewed in an iframe due to a Content Security Policy directive. Please visit the link below to visit thge recipe.</h2>
                            <div className ='single-recipe-error-link'>
                                <a className ='recipe-error-a' href = {item.link} >LINK</a>
                            </div>
                        </div>
                    </div>
                    <div className = {item.link.includes('allrecipes') || item.link.includes('pinchofyum') ? 'single-recipe-page-sub' : 'single-recipe-page-sub-none'}>
                        <div className = 'column-one'>
                            <div className='column-one-sub'>
                                <div className = 'name-and-link-container'>
                                    <div className="single-recipe-name">{item.name}</div>
                                    <a className='single-recipe-link' href={`${item.link}`}>LINK</a>
                                </div>
                                <div className ='image-and-schedule-container'>
                                    <div className ='single-recipe-image-container'>

                                        <img className="recipe-image" src={item.image} alt=''/>

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
                                                item.directions.map((item,index) => <div className={this.state.directionsClicked.includes(index) ? 'selected-direction' : 'direction'} key={item.order} onClick = {() =>{this.clicked(index)}}>{item.directions}</div>) 
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
