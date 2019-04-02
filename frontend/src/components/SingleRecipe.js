import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { GET_DIRECTIONS, getDirections } from '../actions/DirectionsActions';
import { getIngredients } from '../actions/IngredientsActions';
import { getSelectedRecipe } from '../actions/RecipeActions';
import { getCalendarItem } from '../actions/CalendarActions';
import { getTags } from '../actions/TagsActions';
import {bindActionCreators} from 'redux';
import NavBar from "./NavBar";
import '../css/SingleRecipe.css';


class SingleRecipe extends Component{

    constructor(props) {
        super(props)
        
        this.state = { 
            name: '',
            link: '',
            cook_time: '',
            image: '',
            prep_time: '',
            recipe_id: '',
            servings: '',
            directions: [],
            ingredients: []
        }
    } 

componentDidMount()
   // this.props.recipes.filter(item => item.isSelected ===)
    {

        let sendingObject = {
            recipe_id: this.props.match.params.id 
        }
    //get the calendarItem for the selected object
    this.props.getCalendarItem(sendingObject)
    //assigns the newly created calendar state and pulls the tag id for that scheduled item
    let tagObject = {
        tag_id: this.props.calendar[0].tag_id
    }
    // get the word for that tag from the tag reducer and sets that tag as state.
    this.props.getTags(tagObject)


   
    console.log(this.props.calendar[0].tag_id)
   
    

    let receivedObject = {

    }

 axios.get(`https://kookr.herokuapp.com/api/recipes/${sendingObject.recipe_id}`).then(res => {
    this.setState({name: res.data.name, 
        link: res.data.link, 
        cook_time: res.data.cook_time, 
        image: res.data.image, 
        prep_time: res.data.prep_time,
        recipe_id: res.data.recipe_id,
        servings: res.data.servings,
        directions: res.data.directions,
        ingredients: res.data.ingredients        
    })
    console.log(res)
    
})
}
    render(){
        return (
            <div className="windowContainer"> 
            <NavBar />
    <div>
            <div className="recipeWrapper">
            <div className="firstColumn" >
                <div className='firstRow' >
                    <div className="recipeNameTitle">{this.state.name}</div>
                    <button href={`${this.state.link}`}>LINK</button>
                </div>
                <div className="secondRow" >
                    <div><img className="recipeImage" src={this.state.image} /></div>
                    <div className="RecipeCalendarInfo">
                        <div className="borderClass">
                        <div className="thisRecipeTag">{this.props.tags[0].tag}</div>
                        <div className="thisRecipeDate" >{this.props.calendar[0].calendarDate}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="recipeInfo">
                    <div className="recipeInfoTitle"> -Info</div>
                        <div className="recipeInfo2">
                    <div className="recInfo">
                    <div>Prep Time</div>
                    <div>{this.state.prep_time}</div>
                    </div>
                    <div className="recInfo">
                    <div>Cook Time</div>
                    <div>{this.state.cook_time}</div>
                    </div>
                    <div className="recInfo">
                    <div>Servings</div>
                    <div>{this.state.servings}</div>
                    </div>
                    </div>
                    </div>
                    <div className="ingInfo">
                        <div className="ingInfoTitle">-Ingredients</div>
                    <div className="ingInfo2">
                        {this.state.ingredients.map(item => <div className="ingredient" key={item.id} > {item.amount} {item.measurement} {item.name}</div>)}
                    </div>
                    </div>
                </div>
           </div>
                        <div className="direcInfo">
                            
                        <div className="direcInfoTitle" >-Directions</div>
                        <div className="direcInfo2">
                        {this.state.directions.map(item => <div className="directions" key={item.order}>- {item.directions}</div>)}
                        </div>
                        </div>
</div>
            
            
    </div>
            </div>         
        )
    }
} 

const mapDispatchToProps = (dispatch) => bindActionCreators({getDirections, getIngredients, getSelectedRecipe, getCalendarItem, getTags}, dispatch)

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
