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
          ingArrOne: [],
          ingArrTwo: [],
          active: false,
          userId : null,
          dateArr: [], 
          recipeArr: []

        }
    }

    componentDidMount(){
        const userId = localStorage.getItem('userId')
        this.setState({
            userId : Number(userId)
        })
        //this.getRecipe()
    }
    clickHandler = (event) =>{
        console.log("this is a link")
    }
    onChangeDate = async(event) =>{
        await this.setState({
            [event.target.name] : event.target.value
        })
    }
    getDates = async() => {
        if(this.state.startDate.length === 0 || this.state.stopDate.length === 0){
            alert('Please make sure you  have entered a start and stop date')
        }else{
            var dateArray = [];
            var currentDate = moment(this.state.startDate);
            var stopDate = moment(this.state.stopDate);
                  // console.log(currentDate, stopDate)
                  while (currentDate <= stopDate) {
                    dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
                    currentDate = moment(currentDate).add(1, 'days');
                }
        
                //console.log(dateArray);
            
                await this.setState({
                    dateArr: dateArray
                })
                // console.log(this.state.dateArr.length)
        }
    }

    // getRecipe = () =>{
    //     axios
    //     .get('https://kookr.herokuapp.com/api/ingredients/recipe/1')
    //     .then(res =>{
    //         res.data.forEach((element,index)=>{
    //             // console.log(res)
    //             let tempIng ="";
    //             if(element.amount !== null){
    //                 tempIng += formatQuantity(element.amount) + " ";
    //             } 
    //             if ( element.measurement !== null){
    //                 tempIng += element.measurement + " ";
    //             } 
    //             tempIng += element.name
    //             if(index % 2){
    //                 this.setState({
    //                     ingArrOne : [...this.state.ingArrOne,tempIng]
    //                 })
    //             }else{
    //                 this.setState({
    //                     ingArrTwo : [...this.state.ingArrTwo, tempIng]
    //                 })
    //             }
                
    //         })
    //     })
    //     .catch(err =>{
    //         console.log(err)
    //     })
    // }
    toggleClass = async() =>{
        const currentState = this.state.active;
        console.log(currentState)
        await this.setState({ active: !currentState });
        console.log('Line 99', this.state.active)
    };
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
    getRecipesByDate = async() =>{
        const dateArr = this.state.dateArr;
        //  console.log(dateArr.length)
        const userId = this.state.userId;
        // console.log(userId)
        let recipeArrForDates = []
        await dateArr.forEach( async date =>{
          await axios
            .get(`https://kookr.herokuapp.com/api/schedule/user/${userId}/date/${date}`)
                .then( async res =>{
                    if(res.data.length >= 1){
                        for(let i = 0; i < res.data.length; i++){
                            await recipeArrForDates.push(res.data[i])
                        }
                       
                    }else if(res.data.length === 1){
                        await recipeArrForDates.push(res.data)
                    }
                })
                .catch(err =>{
                    console.log(err)

                })
        })
         await this.setState({
            recipeArr : recipeArrForDates
        })
    //     console.log(this.state.recipeArr)
    //   console.log(this.state.recipeArr.length)
       
    }
    getRecipeData = async() =>{
        const recipeArr = this.state.recipeArr
        console.log(recipeArr, recipeArr.length)
        await recipeArr.forEach(async recipe =>{
             await axios
                .get(`https://kookr.herokuapp.com/api/ingredients/recipe/${recipe.recipe_id}`)
                .then(res =>{
                    // res.data.forEach((element,index)=>{
                        console.log(res)
                        res.data.forEach((element,index)=>{
                            // console.log(res)
                            let tempIng ="";
                            if(element.amount !== null){
                                tempIng += formatQuantity(element.amount) + " ";
                            } 
                            if ( element.measurement !== null){
                                tempIng += element.measurement + " ";
                            } 
                            tempIng += element.name
                            if(index % 2){
                                this.setState({
                                    ingArrOne : [...this.state.ingArrOne,tempIng]
                                })
                            }else{
                                this.setState({
                                    ingArrTwo : [...this.state.ingArrTwo, tempIng]
                                })
                            }
                            
                        })
                    //     let tempIng ="";
                    //     if(element.amount !== null){
                    //         tempIng += formatQuantity(element.amount) + " ";
                    //     } 
                    //     if ( element.measurement !== null){
                    //         tempIng += element.measurement + " ";
                    //     } 
                    //     tempIng += element.name
                    // })
                })
                .catch(err =>{
                    console.log(err)
                })
        })
       
    }
    timeoutFunction = () =>{
        setTimeout(
            function(){
                console.log('Yo')
                this.getRecipeData();
        //         const recipeArr = this.state.recipeArr
        // console.log(recipeArr, recipeArr.length)
        // console.log(this.state)
            }.bind(this),1000
        )
    }
   
    ///get ingredients for recipes
    generateList = async() =>{
       await this.getDates();
       await this.getRecipesByDate();
       await this.timeoutFunction()
   
    
    }
    render(){
        return (
            <div className="GroceryList">
                <NavBar />
                 <div className='grocery-list-page'>
                    <div className = 'grocery-list-sub-container'>
                        <div className = 'grocery-list-intro-container'>
                            <div className='grocery-list-page-header'>
                                Grocery List
                            </div>
                        </div>    
                        <div className="dates-section">
                            <form className = 'dates-section-form'>
                                <div className ='start-date-container'>
                                    <p className = 'date-p'>Select range start date:</p>
                                    <input className='start-date' type = 'date' name = 'startDate' value ={this.state.startDate} onChange = {this.onChangeDate}/>  
                                </div>
                                <div className ='stop-date-container'>
                                    <p className = 'date-p'>Select range end date:</p>
                                    <input className = 'stop-date' type = 'date' name = 'stopDate' value = {this.state.stopDate} onChange = {this.onChangeDate}/>
                                </div>    
                            </form >
                            <div className="generate-button-container" onClick = {this.generateList}>
                                <p className='grocery-list-page-p'>
                                    Select a date range, populate your grocery list based on pre-selected recipe servings, modify and export your shopping list
                                </p>
                                <div className='generate-button'>
                                Generate Grocery List 
                                </div>
                            </div>
                        </div>
                        <div className="list-section-container">
                            <div className ='list-section-sub-container'>
                                <h1 className = 'shopping-list-paper-header'>Shopping List : </h1>
                                <div className="shopping-list">
                                    <ul className = 'list-row-one'>
                                        {this.state.ingArrOne.map(item =>(
                                            <li className={this.state.active ? ' ing selected': 'ing'} 
                                            onclick={this.toggleClass}>{item}</li>
                                        ))}
                                    </ul>
                                    <ul className = 'list-row-two'>
                                        {this.state.ingArrTwo.map(item =>(
                                            <li className = 'ing'>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
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


