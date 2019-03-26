
export const ADD_DIRECTIONS = "ADD_DIRECTIONS"
export const DELETE_DIRECTIONS = "DELETE_DIRECTIONS"
export const UPDATE_DIRECTIONS = "UPDATE_DIRECTIONS"
export const GET_DIRECTIONS = "GET_DIRECTIONS"








export const addDirections = (directions) => (dispatch) => {

    dispatch({
        type: ADD_DIRECTIONS,
        payload: {directions} 
    })

}


export const deleteDirections = (directions) => (dispatch) => {

    dispatch({
        type: DELETE_DIRECTIONS,
        payload: {directions}
    })

}

export const updateDirections = (directions) => (dispatch) => {

    dispatch({
        type: UPDATE_DIRECTIONS,
        payload: {directions}
    })

}

export const getDirections = (directions) => (dispatch) => {

    dispatch({
        type: GET_DIRECTIONS,
        payload: {directions, recipe_id: directions.recipe_id }
    })

}

