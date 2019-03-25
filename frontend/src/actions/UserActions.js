
export const ADD_USER = "ADD_USER"
export const DELETE_USER = "DELETE_USER"
export const UPDATE_USER = "UPDATE_USER"
export const GET_USER = "GET_USER"








export const addUser = (user) => (dispatch) => {
    
    dispatch({
        type: ADD_USER,
        payload: {user, id: user.id}
    })

}

export const deleteUser = (user) => (dispatch) => {

    dispatch({
        type: DELETE_USER,
        payload: {user}
    })

}

export const updateUser = (user) => (dispatch) => {

    dispatch({
        type: UPDATE_USER,
        payload: {user}
    })

}
export const getUser = (user) => (dispatch) => {

    dispatch({
        type: GET_USER,
        payload: {user}
    })

}