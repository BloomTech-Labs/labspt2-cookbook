import { ADD_DIRECTIONS, DELETE_DIRECTIONS, UPDATE_DIRECTIONS, GET_DIRECTIONS} from '../actions/DirectionsActions';


const initialState = {
   directions: [{
                dir_id: 0,
                recipe_id: 0,
                order: 0,
                directions: 'directions string'
                },
                {
                    dir_id: 0,
                    recipe_id: 1,
                    order: 0,
                    directions: 'directions string'
                    },
                    {
                        dir_id: 0,
                        recipe_id: 0,
                        order: 0,
                        directions: 'directions string'
                        }]
}

const DirectionsReducer = ((state = initialState, action) => {
    switch (action.type) {

        case GET_DIRECTIONS:
        //need to have a filter by recipe_id
            //need to review the filter requirements
           
            return state.filter(item =>  action.recipe_id = item.recipe_id)
        
            case ADD_DIRECTIONS:
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