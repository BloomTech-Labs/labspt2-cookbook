import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBar from './NavBar';
import '../css/GroceryList.css';

import moment from 'moment';

class GroceryList extends Component{
    constructor(props){
        super()
        this.state ={
          startDate : '',
          stopDate:  ''
        }
    }
    onChangeDate = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    getDates = () => {
        var dateArray = [];
        var currentDate = moment(this.state.startDate);
        
        var stopDate = moment(this.statestopDate);
        while (currentDate <= stopDate) {
            dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
            currentDate = moment(currentDate).add(1, 'days');
        }
        console.log(dateArray);
        return dateArray;
        
       
    }
  
    
    render(){
        console.log(this.state.startDate);
        console.log(this.state.stopDate)
        return (
            <div className="GroceryList">
                <NavBar />
                 <div className='grocery-list-page'>
                    <div className="calendarSection">
                       {/* <Calendar selectRange = {true} /> */}
                        <form >
                            <input type = 'date' name = 'startDate' value ={this.state.startDate} onChange = {this.onChangeDate}/>
                            <input type = 'date' name = 'stopDate' value = {this.state.stopDate} onChange = {this.onChangeDate}/>
                                <div onClick = {this.getDates} >Save dates</div>
                        </form >
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
            </div>           
        )
    }
} 




const mapStateToProps = state => {
    return {
        user: state.UserReducer
    }
}


export default connect(mapStateToProps)(GroceryList)
