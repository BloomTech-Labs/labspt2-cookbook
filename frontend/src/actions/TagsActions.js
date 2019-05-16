import Axios from "axios";

export const ADD_TAG = "ADD_TAG"
export const DELETE_TAG = "DELETE_TAG"
export const UPDATE_TAG = "UPDATE_TAG"
export const GET_TAGS = "GET_TAGS"








export const addTag = (tag) => (dispatch) => {
    
    dispatch({
        type: ADD_TAG,
        payload: {tag, id: tag.id}
    })

}

export const deleteTag = (tag) => (dispatch) => {

    dispatch({
        type: DELETE_TAG,
        payload: {tag}
    })

}

export const updateTag = (tag) => (dispatch) => {

    dispatch({
        type: UPDATE_TAG,
        payload: {tag}
    })

}

export const getTags2 = () => (dispatch) => {
///api/tags

    Axios.get('https://kookr.herokuapp.com/api/tags')
        .then(res => {
        
            dispatch({
                type: GET_TAGS,
                payload: res.data
            })
        


        })
        .catch((err) => console.error("Error in getTags2: ",err))
}

export const getTags = () =>  {

    return dispatch => {
        dispatch(getTags2())
    }

}