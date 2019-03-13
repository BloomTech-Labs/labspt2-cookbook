import React, { Component } from 'react';
import { connect } from 'react-redux';

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

const mapStateToProps = function(state) {
    return {
        user: state.UserReducer
    }
}


export default connect(mapStateToProps)(GroceryList)


//export default GroceryList