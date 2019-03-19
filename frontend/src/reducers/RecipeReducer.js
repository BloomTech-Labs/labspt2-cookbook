
import { ADD_RECIPE, DELETE_RECIPE, UPDATE_RECIPE, GET_SELECTED_RECIPE } from '../actions/RecipeActions';


const initialState = {
   recipes: [{
                recipe_id: 0,
                name: 'name string',
                image: 'image url string',
                link: 'recipe url string',
                prep_time: 0,
                cook_time: 0,
                servings: 0,
                isSelected: false
}]
}

// not complete
const RecipeReducer = ((state = initialState, action) => {
    switch (action.type) {

        case ADD_RECIPE:
            return state

        case DELETE_RECIPE:
            return state

        case UPDATE_RECIPE:
            return state;
            
        case GET_SELECTED_RECIPE: 
            
            return Object.assign({}, state, {
                recipes: state.recipes.map(recipes => {
                    // if exists
                    if(state.recipe_id !== action.recipe_id) 
                    {
                        return state
                    }
                    // find if its been selected
                    if(recipes.isSelected = true) {
                        //return object of the recipe in question has true for isSelected
                        return state.recipes.filter(item => item.isSelected === action.isSelected)
                    } else {
                        return state
                    }
                })
               
            });
        

        default:
            return state;
            
    }
})

export {RecipeReducer}