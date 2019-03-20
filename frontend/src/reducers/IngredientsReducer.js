import { createStore } from 'redux'
import { ADD_INGREDIENTS, DELETE_INGREDIENTS, UPDATE_INGREDIENTS, GET_INGREDIENTS } from '../actions/IngredientsActions';


const initialState = {
    ingredients: [{
      ing_id: 0,
      name: 'string name'
    }]
}

// not complete
const IngredientsReducer = ((state = initialState, action) => {
    switch (action.type) {

        case GET_INGREDIENTS:
        //need to get by recipe ID
            return state
        
        case ADD_INGREDIENTS:
            return state

        case DELETE_INGREDIENTS:
            return state

        case UPDATE_INGREDIENTS:
            return state;
            
        default:
            return state;
            
    }
})

export {IngredientsReducer}