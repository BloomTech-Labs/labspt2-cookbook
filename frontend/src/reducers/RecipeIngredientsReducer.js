
import { ADD_RECIPE_INGREDIENTS, DELETE_RECIPE_INGREDIENTS, UPDATE_RECIPE_INGREDIENTS, GET_RECIPE_INGREDIENTS } from '../actions/RecipeIngredientsActions';


const initialState = {
    recipeingredients: [{
      id: 0,
      recipe_id: 0,
      amount: 0,
      measurement: 'string',
      ing_id: 0
    }]
}

// not complete
const RecipeIngredientsReducer = ((state = initialState, action) => {
    switch (action.type) {

        case GET_RECIPE_INGREDIENTS:
        //need to get by recipe ID
            return state
        
        case ADD_RECIPE_INGREDIENTS:
        state = Object.assign({}, state, {recipeingredients: state.recipeingredients.push(action.payload)})
            return state

        case DELETE_RECIPE_INGREDIENTS:
            return state

        case UPDATE_RECIPE_INGREDIENTS:
            return state;
            
        default:
            return state;
            
    }
})

export {RecipeIngredientsReducer}