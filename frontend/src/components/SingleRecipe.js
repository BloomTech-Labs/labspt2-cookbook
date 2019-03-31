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
        recipe_id: 1
    }
    
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
            <div> 
            <NavBar />
         
            <div>
                <div>{this.state.name}</div>
                <div> {this.state.link}</div>
            </div>
            <div>
                <div>
                    <div>Prep Time</div>
                    <div>{this.state.prep_time}</div>
                </div>
                <div>
                    <div>Cook Time</div>
                    <div>{this.state.cook_time}</div>
                </div>
                <div>
                    <div>Servings</div>
                    <div>{this.state.servings}</div>
                </div>

                {this.state.ingredients.map(item => <div key={item.id} > {item.amount} {item.measurement} {item.name}</div>)}
                {this.state.directions.map(item => <div key={item.order}>{item.directions}</div>)}
            </div>
          


            )}
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
