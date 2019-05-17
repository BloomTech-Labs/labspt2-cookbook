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
            recipeArr: [],
            recipeDataArrScraped: [],
            recipeDataArrNotScraped: [],
            clickedIndexArr: [],
            clickedIndexArrTwo: [],
            tempIngArr: [],
            }
    }

    componentDidMount(){
        const userId = localStorage.getItem('userId')
        this.setState({
            userId : Number(userId)
        })
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
                  while (currentDate <= stopDate) {
                    dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
                    currentDate = moment(currentDate).add(1, 'days');
                }
            
                await this.setState({
                    dateArr: dateArray
                })
        }
    }

    toggleClass = async() =>{
        const currentState = this.state.active;
        await this.setState({ active: !currentState });
    };
    
    getRecipesByDate = async() =>{
        const dateArr = this.state.dateArr;
        const userId = this.state.userId;
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
                    console.error(err)
                })
        })
            await this.setState({
            recipeArr : recipeArrForDates
        })
    }

    getRecipeData = async() =>{
        const recipeArr = this.state.recipeArr
        let scraped = []
        let unscraped = []
        await recipeArr.forEach(async recipe =>{
            await axios
            .get(`https://kookr.herokuapp.com/api/recipes/${recipe.recipe_id}`)
            .then(async res =>{

                 if(res.data.link.includes('allrecipes') || res.data.link.includes('pinchofyum')){
                    scraped.push(res.data) 
                    await this.setState({
                         recipeDataArrScraped: scraped
                     })
                 }else{
                     unscraped.push(res.data)
                     await this.setState({
                         recipeDataArrNotScraped: unscraped
                     })
                 }
          
                let originalRecipeServings = res.data.servings
                let scheduledRecipeServings = recipe.servings
                if(originalRecipeServings === scheduledRecipeServings ){
                    axios
                    .get(`https://kookr.herokuapp.com/api/ingredients/recipe/${recipe.recipe_id}`)
                    .then(res =>{
                            res.data.forEach((element)=>{
                                this.setState({
                                    tempIngArr : [...this.state.tempIngArr,element]
                                })
                            })
                    })
                    .catch(err =>{
                        console.error(err)
                    })
                } else {
                    axios
                    .get(`https://kookr.herokuapp.com/api/ingredients/recipe/${recipe.recipe_id}`)
                    .then(res =>{
                            res.data.forEach((element)=>{
                                if(element.amount == null && element.measurement == null){
                                } else {
                                    if(element.amount !== null){
                                        let tempElementAmount = element.amount
                                        tempElementAmount = (tempElementAmount/originalRecipeServings)*scheduledRecipeServings
                                        element.amount = tempElementAmount
                                    } 
                                    this.setState({
                                        tempIngArr : [...this.state.tempIngArr,element]
                                    })
                                }
                            })
                    })
                    .catch(err =>{
                        console.error(err)
                    })
                }
            })
            .catch(err =>{
                console.error(err)
            })
        })
    }

    combineIngredients = () =>{
        let {tempIngArr} = this.state 
        let sortedArr = []
        for(let i=0; i<tempIngArr.length;i++){
            if((!sortedArr.some(ing => ing.name === tempIngArr[i].name))){
                sortedArr.push(tempIngArr[i])    
            } else {
                const index = sortedArr.findIndex(element => element.name === tempIngArr[i].name)
                sortedArr[index].amount = Math.ceil(sortedArr[index].amount + tempIngArr[i].amount)
            }
        };
        sortedArr.forEach((element,index)=>{
        let tempIng ="";
        if(element.measurement !== null && element.amount !== null){
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
        }
    })
}

    timeoutFunction = () =>{
        setTimeout(
            function(){
                this.getRecipeData();
            }.bind(this),1000
        ) 
    }

    anotherTimeoutFunction =() =>{
        setTimeout(
            function(){
                this.combineIngredients();
            }.bind(this),1500
        )
    } 

    generateList = async() =>{
       await this.getDates();
       await this.getRecipesByDate();
       await this.timeoutFunction();
       await this.anotherTimeoutFunction();
    }

    clicked = async(index) =>{
        const indexArr = this.state.clickedIndexArr
        if(indexArr.includes(index)){
            await this.setState({
                clickedIndexArr: [...this.state.clickedIndexArr.filter(item => item !== index)]
            })
        
       }else{
            await this.setState({
                clickedIndexArr: [...this.state.clickedIndexArr, index]
            })
       }
    }

    clickedTwo = async(index) =>{
        const indexArr = this.state.clickedIndexArrTwo
        if(indexArr.includes(index)){
            await this.setState({
                clickedIndexArrTwo: [...this.state.clickedIndexArrTwo.filter(item => item !== index)]
            })
        
       }else{
            await this.setState({
                clickedIndexArrTwo: [...this.state.clickedIndexArrTwo, index]
            })
       }
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
                        <div className ='grocery-list-incoming-recipes-container'>
                            <div className ='scraped-recipes'>
                                <h3 className = 'incoming-recipes-header'>Recipes supported by this page:</h3>
                                {this.state.recipeDataArrScraped.map(recipe =>(
                                    <div>- {recipe.name}</div>
                                ))}
                            </div>
                            <div className = 'unscraped-recipes'>
                                <h3 className ='incoming-recipes-header'>Recipes not supported by this page:</h3>
                                <p className = 'incoming-recipes-p'>Please visit ink for ingredients</p>
                                {this.state.recipeDataArrNotScraped.map(recipe =>(
                                    <div>
                                        <div>-{recipe.name}</div>
                                        <a href = {recipe.link}>Recipe Link</a>
                                    </div>    
                                ))}
                            </div>
                        
                        </div>
                        <div className="list-section-container">
                            <div className ='list-section-sub-container'>
                                <h1 className = 'shopping-list-paper-header'>Shopping List : </h1>
                                <div className="shopping-list">
                                    <ul className = 'list-row-one'>
                                        {this.state.ingArrOne.map((item, index) =>(
                                            <li  className ={this.state.clickedIndexArr.includes(index) ? 'selected-ing' : 'ing'} onClick = {() =>this.clicked(index)} >{item}</li>
                            
                                        ))}
                                    </ul>
                                    <ul className = 'list-row-two'>
                                        {this.state.ingArrTwo.map((item,index) =>(
                                              <li  className ={this.state.clickedIndexArrTwo.includes(index) ? 'selected-ing' : 'ing'} onClick = {() =>this.clickedTwo(index)} >{item}</li>
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