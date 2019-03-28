
import { ADD_RECIPE, DELETE_RECIPE, UPDATE_RECIPE, GET_SELECTED_RECIPE} from '../actions/RecipeActions';


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
            //makes .isSelected === false if something was still true
            state = state.recipes.map(item => {if(item.isSelected === true) {item.isSelected = false}}) 
            state = Object.assign({}, state, {recipes: state.recipes.push(action.payload)})
                return state

        case DELETE_RECIPE:
             return state

        case UPDATE_RECIPE:
            //only updates the isSelected Property to true
            state = state.recipes.map(item => {
                if(item.recipe_id === action.payload.recipe_id) {
                    item.isSelected = true
                }
            })
            return state;

        case GET_SELECTED_RECIPE: 
            Object.assign({}, state, {recipes: state.recipes.filter(item => item.isSelected === action.payload.isSelected)})
            return state;

        default:
            //makes .isSelected === false if something was still true
            //state = state.recipes.map(item => {if(item.isSelected === true) {item.isSelected = false}})
            return state;
            
    }
})

export {RecipeReducer}