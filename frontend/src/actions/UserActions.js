
export const ADD_USER = "ADD_USER"
export const DELETE_USER = "DELETE_USER"
export const UPDATE_USER = "UPDATE_USER"









export function addUser(user) {

    return {
        type: ADD_USER,
        USER: user
    }

}

export function deleteUser(user) {

    return {
        type: DELETE_USER,
        USER: user
    }

}

export function updateUser(user) {

    return {
        type: UPDATE_USER,
        USER: user
    }

}
