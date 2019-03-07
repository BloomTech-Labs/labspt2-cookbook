import React from 'react';
import '../css/CreateRecipe.css';

import  '../css/CreateRecipe.css';
import NavBar from './NavBar';

class CreateRecipe extends React.Component{
    //Verifying user login?
    render(){
        return(
            <div className='Create-Recipe'>
                <NavBar /> 
                <div className='create-page-container'>
                    <div className='url-add-recipe-section'> 
                        <form className='add-recipe-form'>
                            <div className='url-input-container'>
                                <input 
                                    className='url-drop-input' 
                                    placeholder='  Drag and drop url here'/>
                            </div>        
                            <div className='recipe-preview'>
                                I am the recipe preview
                            </div>   
                            <div className='add-recipe-button'> Save </div> 
                        </form>
                    </div>
                    <div className='recipe-modification-section'>
                        <div className='meal-tag-section'>
                            <h3 className='meal-tag-header'>Click to add meal tag</h3>
                            <div className='meal-tag'>
                                <p className='meal-tag-p'>Breakfast</p>
                                <img className='meal-tag-icon' src = 'https://image.flaticon.com/icons/svg/135/135398.svg' alt = 'egg-icon'/>
                            </div>
                            <div className='meal-tag'>
                                <p className='meal-tag-p'>Lunch</p>
                                <img className='meal-tag-icon' src = 'https://image.flaticon.com/icons/svg/135/135406.svg' alt = 'salad-icon'/>
                            </div>
                            <div className='meal-tag'>
                                <p className='meal-tag-p'>Dinner</p>
                                <img className='meal-tag-icon' src = 'https://image.flaticon.com/icons/svg/103/103172.svg' alt = 'fish-icon'/>
                            </div>
                            <div className='meal-tag'>
                                <p className='meal-tag-p'>Dessert</p>
                                <img className='meal-tag-icon' src = 'https://image.flaticon.com/icons/svg/103/103147.svg' alt = 'cupcake-icon'/>
                            </div>
                            <div className='meal-tag'>
                                <p className='meal-tag-p'>Snack</p>
                                <img className='meal-tag-icon' src = 'https://image.flaticon.com/icons/svg/738/738096.svg' alt = 'watermelon-icon'/>
                            </div>
                        </div>
                        <div className='edit-servings-section'>
                            <div className = 'servings-counter'>Counter</div>
                            <p className = 'servings-p'>Servings</p>
                        </div>
                        <div className='calendar-section'>
                            <div className = 'date-selector'>Date selection placeholder</div>
                            <div className = 'calendar-mini'>Calendar placeholder</div>
                        </div>
                    </div>
                </div>           
            </div>
        )
    }
}
export default CreateRecipe;