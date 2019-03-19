import React, { Component } from 'react';
import { connect } from 'react-redux';

class Calendar extends Component{

    render(){
        return (
            <div className="calendarPage">
                <div className="calendar">This will be a calendar</div>
                <div className="sideForm">
                    <form>
                        <div className="buttons">
                            <div>Breakfast</div>
                            <div>Lunch</div>
                            <div>Dinner</div>
                            <div>Dessert</div>
                            <div>Snack</div>
                        </div>
                        <input type="search" placeholder="Search"/>
                        <input type="number" min="1" />
                        <input type="checkbox" /> Duplicate Previous Week
                        <input type="submit" value="save"/>
                    </form>
                </div>
            </div>           
        )
    }
} 

const mapStateToProps = state => {
    return {
        user: state.UserReducer.user
    }
}


export default connect(mapStateToProps)(Calendar)
