
import { ADD_TAG, DELETE_TAG, UPDATE_TAG, GET_TAGS } from '../actions/TagsActions';


const initialState = {
    tags: [{
        tag_id: 1,
        tag: 'breakfast',
    },{
        tag_id: 2,
        tag: 'lunch',
    },{
        tag_id: 3,
        tag: 'dinner',
    },{
        tag_id: 4,
        tag: 'snack',
    }]
}

// not complete
const TagsReducer = ((state = initialState, action) => {
    switch (action.type) {

        case GET_TAGS:

        return {
            tags: [action.payload]
        }

        case ADD_TAG:
        Object.assign({}, state, {tags: state.tags.push(action.payload)})

            return state

        case DELETE_TAG:
            return state

        case UPDATE_TAG:
            return state;
            
        default:
            return state;
            
    }
})

export {TagsReducer}