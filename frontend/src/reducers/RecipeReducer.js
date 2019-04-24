
import { GET_RECIPES, ADD_RECIPE, DELETE_RECIPE, UPDATE_RECIPE, GET_SELECTED_RECIPE, ADD_RECIPE_SUCCESS} from '../actions/RecipeActions';


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
                console.log(action.payload)
                return {
                    recipes: [ ...state.recipes, action.payload.recipe]
                }
                
        // case FILTER_RECIPES:                

        //         const tempArray = state.recipes.filter(recipes => recipes.tag_id === action.payload.tad_id)

        //         return {...state, recipes: [...tempArray]}

        case GET_RECIPES:
                console.log(action.payload)
                return {
                    recipes: [ ...action.payload.recipes]
                }
                
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
            console.log(action.payload)
            //state = Object.assign({}, state, {recipes: state.recipes.filter(item => item.recipe_id === action.payload.recipe_id)})
            return {...state, selectedRecipe: action.payload}
            //change

        case ADD_RECIPE_SUCCESS:
        console.log(state.recipes)
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