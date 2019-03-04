import React from 'react';

import  '../css/CreateRecipe.css';
import NavBar from './NavBar';

class CreateRecipe extends React.Component{
    //Verifying user login?
    render(){
        return(
            <div className = 'Create-Recipe'>
                <NavBar className = 'nav'/> 
                <div className = 'create-page-container'>
                    <div className = 'url-add-recipe-section'> 
                        <form className = 'add-recipe-form'>
                            <input 
                                className = 'url-drop-input' 
                                placeholder = 'drag and drop url here'/>
                            <div className = 'recipe-preview'>
                                I am the recipe preview
                            </div>   
                            <div className = 'add-recipe-button'> Save </div> 
                        </form>
                    </div>
                    <div className = 'recipe-modification-section'>
                        <div className = 'meal-tag-section'>
                            <div className = 'meal-tag'>Breakfast</div>
                            <div className = 'meal-tag'>Lunch</div>
                            <div className = 'meal-tag'>Dinner</div>
                            <div className = 'meal-tag'>Dessert</div>
                            <div className = 'meal-tag'>Snack</div>
                        </div>
                        <div className = 'edit-servings-section'>
                            <div>Servings editor</div>
                        </div>
                        <div className = 'calendar-section'>

                        </div>
                    </div>
                </div>           
            </div>
        )
    }
}
export default CreateRecipe;