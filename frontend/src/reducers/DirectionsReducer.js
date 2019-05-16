import { ADD_DIRECTIONS, DELETE_DIRECTIONS, UPDATE_DIRECTIONS, GET_DIRECTIONS} from '../actions/DirectionsActions';


const initialState = {
   directions: [{
                dir_id: 0,
                recipe_id: 1,
                order: 0,
                directions: 'directions string1'
                },
                {
                dir_id: 0,
                recipe_id: 1,
                order: 0,
                directions: 'directions string2'
                },
                {
                dir_id: 0,
                recipe_id: 3,
                order: 0,
                directions: 'directions string3'
                },
                {
                    dir_id: 0,
                    recipe_id: 1,
                    order: 0,
                    directions: 'directions string4'
                    }]
}

const DirectionsReducer = ((state = initialState, action) => {
    switch (action.type) {

        case GET_DIRECTIONS:
        //need to have a filter by recipe_id
            //need to review the filter requirements

            return Object.assign({}, state, {directions: state.directions.filter(item => action.payload.recipe_id === item.recipe_id)} )
            
           //return [...]
            case ADD_DIRECTIONS:
            state = Object.assign({}, state, {directions: state.directions.push(action.payload)})
            return state

        case DELETE_DIRECTIONS:
            return state

        case UPDATE_DIRECTIONS:
            return state;

        default:
            return state;
            
    }
})

export {DirectionsReducer}