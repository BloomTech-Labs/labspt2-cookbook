import { ADD_INGREDIENTS, DELETE_INGREDIENTS, UPDATE_INGREDIENTS, GET_INGREDIENTS } from '../actions/IngredientsActions';


const initialState = {
    ingredients: [{
      ing_id: 0,
      name: 'string name'
    },
    {
        ing_id: 1,
        name: 'string name'
      },
      {
        ing_id: 2,
        name: 'string name'
      }]
}

// not complete
const IngredientsReducer = ((state = initialState, action) => {
    switch (action.type) {

        case GET_INGREDIENTS:
        //need to get by recipe ID
            return Object.assign({}, state, {ingredients: state.directions.filter(item => action.payload.ing_id === item.ing_id)} )
        
        case ADD_INGREDIENTS:
        state = Object.assign({}, state, {ingredients: state.ingredients.push(action.payload)})
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