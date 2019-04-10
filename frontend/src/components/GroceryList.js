import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCalendarItem } from '../actions/CalendarActions';
import axios from 'axios';
import formatQuantity from 'format-quantity'

import NavBar from './NavBar';
import '../css/GroceryList.css';

import moment from 'moment';

class GroceryList extends Component{
    constructor(props){
        super()
        this.state ={
          startDate : '',
          stopDate:  '',
          ingArr: []
        }
    }

    componentDidMount(){
        this.getRecipe()
    }

    onChangeDate = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    getDates = () => {
        var dateArray = [];
        var currentDate = moment(this.state.startDate);
        
        var stopDate = moment(this.state.stopDate);
        console.log(currentDate, stopDate)
        while (currentDate <= stopDate) {
            dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
            currentDate = moment(currentDate).add(1, 'days');
        }
 
        console.log(dateArray);
        return dateArray;
        
    }

    getRecipe = () =>{
        axios
        .get('https://kookr.herokuapp.com/api/ingredients/recipe/1')
        .then(res =>{
            res.data.forEach((element)=>{
                let tempIng ="";
                if(element.amount !== null){
                    tempIng += formatQuantity(element.amount) + " ";
                } 
                if ( element.measurement !== null){
                    tempIng += element.measurement + " ";
                } 
                tempIng += element.name
                this.setState({
                    ingArr : [...this.state.ingArr,tempIng]
                })
                
            })
        })
        .catch(err =>{
            console.log(err)
        })

        
    }
    // servingsAdjustor = () =>{
    //     const testIngredients = this.state.testRecipeData.ingredients
    //     const testIngredientsAmount = this.state.testRecipeData.ingredients.amount
    //     const testServings = this.state.testRecipeData.servings
    //     // const ingredients = this.state.recipeData.ingredients
    //     // const recipeServings = this.state.recipeData.servings
    //     const servings = this.state.servings
    //     for(let i = 0; i < testIngredients.length; i++){
    //         if(testServings > servings){ // given 3 want 2
    //            // amount = amount * (2 / 3)
    //            testIngredientsAmount = testIngredientsAmount * (servings / testServings)
    //            return testIngredientsAmount;
    //         }else if(testServings < servings){ //given 2 want 6
    //            let multiplier = servings / testServings  //6 /2 = 3
    //             testIngredientsAmount = testIngredientsAmount * multiplier
    //             return testIngredientsAmount
    //         }else{
    //             return testIngredientsAmount
    //         }
    //     }
    // }
  
    
    render(){
        console.log(this.state.startDate);
        console.log(this.state.stopDate);
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
                        <ul>
                            {this.state.ingArr.map(item =>(
                                <li>{item}</li>
                            ))}
                        </ul>
                        </div>
                        <div className="pageTurnIcon">Icon Here</div>
                    </div>
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


