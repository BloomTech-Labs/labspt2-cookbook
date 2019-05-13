
import {GET_RECIPES_BY_ID, GET_RECIPES_BY_TAG, GET_RECIPES, ADD_RECIPE, DELETE_RECIPE, UPDATE_RECIPE, GET_SELECTED_RECIPE, ADD_RECIPE_SUCCESS} from '../actions/RecipeActions';


const initialState = {
   recipes: [
//        {
//     recipe_id: 0,
//     name: 'name string1',
//     image: 'image url string',
//     link: 'recipe url string',
//     prep_time: 0,
//     cook_time: 0,
//     servings: 0,
//     isSelected: false
// }
   ],
   selectedRecipe: null
}

// not complete
const RecipeReducer = ((state = initialState, action) => {
    switch (action.type) {

        case ADD_RECIPE:
                //might not need anything to return. the state will take care of the rest
               
                return {
                    recipes: [ ...state.recipes, action.payload.recipe]
                }
        
        case GET_RECIPES_BY_ID:
              
                let recipesArray = action.payload.recipes.filter(recipe => recipe.recipe_id === parseInt(action.payload.recipe_id) )
                    // recipe.recipe_id === action.payload.recipe_id 
               
            
            return {...state, recipes: recipesArray}    
        
        case GET_RECIPES_BY_TAG:                
                
               
                
                const tempArray = state.recipes.filter(recipes => recipes.bestdate.tag === action.payload.tag )
                
               

                return {...state, recipes: [...tempArray]}

        case GET_RECIPES:
              
                return {
                    recipes: [ ...action.payload.recipes]
                }
                
        case DELETE_RECIPE:

        const index = state.recipes.map(item => item.recipe_id).indexOf(action.payload.recipe_id)

                const stateTemp = [
                    ...state.recipes.slice(0, index),
                    ...state.recipes.slice(index + 1)
                ]
                state = {recipes: stateTemp}

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
            
            //state = Object.assign({}, state, {recipes: state.recipes.filter(item => item.recipe_id === action.payload.recipe_id)})
            return {...state, selectedRecipe: action.payload}
            //change

        case ADD_RECIPE_SUCCESS:
        
            return state;

        default:
            //makes .isSelected === false if something was still true
            //state = state.recipes.map(item => {if(item.isSelected === true) {item.isSelected = false}})
            return state;
            
    }
})

export {RecipeReducer}


// {
//     recipe_id: 0,
//     name: 'name string1',
//     image: 'image url string',
//     link: 'recipe url string',
//     prep_time: 0,
//     cook_time: 0,
//     servings: 0,
//     isSelected: false
// },
// {
// recipe_id: 1,
// name: 'name string2',
// image: 'image url string',
// link: 'recipe url string',
// prep_time: 0,
// cook_time: 0,
// servings: 0,
// isSelected: false
// },
// {
// recipe_id: 2,
// name: 'name string3',
// image: 'image url string',
// link: 'recipe url string',
// prep_time: 0,
// cook_time: 0,
// servings: 0,
// isSelected: false
// },
// {
// recipe_id: 3,
// name: 'name string4',
// image: 'image url string',
// link: 'recipe url string',
// prep_time: 0,
// cook_time: 0,
// servings: 0,
// isSelected: false
// }