import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCalendarItem } from '../actions/CalendarActions';

class GroceryList extends Component{

    render(){
        return (
            <div className="groceryListPage">
                <div className="calendarSection">
                    <div className="calendar">
                        Calendar will go here
                    </div>
                    <div className="generateButton">
                        Generate Grocery List 
                    </div>
                </div>
                <div className="listSection">
                    <h1>Grocery List for Variable</h1>
                    <div className="list">
                        Will map out a list from selected days
                    </div>
                    <div className="pageTurnIcon">Icon Here</div>
                </div>
            </div>           
        )
    }
} 

const mapDispatchToProps = (dispatch) => bindActionCreators({getCalendarItem},dispatch)


const mapStateToProps = state => {
    //use this.props to call these
    return {
        user: state.UserReducer.user,
        recipes: state.RecipeReducer.recipes,
        directions: state.DirectionsReducer.directions,
        recipeingredients: state.RecipeIngredientsReducer.recipeingredients,
        ingredients: state.IngredientsReducer.ingredients,
        tags: state.TagsReducer.tags,
        calendar: state.CalendarReducer.calendar
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(GroceryList)

