
import { ADD_RECIPE, DELETE_RECIPE, UPDATE_RECIPE, GET_SELECTED_RECIPE} from '../actions/RecipeActions';


const initialState = {
   recipes: [{
                recipe_id: 0,
                name: 'name string1',
                image: 'image url string',
                link: 'recipe url string',
                prep_time: 0,
                cook_time: 0,
                servings: 0,
                isSelected: false
},
{
    recipe_id: 1,
    name: 'name string2',
    image: 'image url string',
    link: 'recipe url string',
    prep_time: 0,
    cook_time: 0,
    servings: 0,
    isSelected: false
},
{
    recipe_id: 2,
    name: 'name string3',
    image: 'image url string',
    link: 'recipe url string',
    prep_time: 0,
    cook_time: 0,
    servings: 0,
    isSelected: false
},
{
    recipe_id: 3,
    name: 'name string4',
    image: 'image url string',
    link: 'recipe url string',
    prep_time: 0,
    cook_time: 0,
    servings: 0,
    isSelected: false
}

]
}

// not complete
const RecipeReducer = ((state = initialState, action) => {
    switch (action.type) {

        case ADD_RECIPE:
            //makes .isSelected === false if something was still true
            state = state.recipes.map(item => {if(item.isSelected === true) {item.isSelected = false}}) 
            state = Object.assign({}, state, {recipes: state.recipes.push(action.payload)})
            console.log(state)
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
            console.log(action.payload)
            state = Object.assign({}, state, {recipes: state.recipes.filter(item => item.recipe_id === action.payload.recipe_id)})
            return state;

        default:
            //makes .isSelected === false if something was still true
            //state = state.recipes.map(item => {if(item.isSelected === true) {item.isSelected = false}})
            return state;
            
    }
})

export {RecipeReducer}