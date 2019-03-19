
export const ADD_DIRECTIONS = "ADD_DIRECTIONS"
export const DELETE_DIRECTIONS = "DELETE_DIRECTIONS"
export const UPDATE_DIRECTIONS = "UPDATE_DIRECTIONS"
export const GET_DIRECTIONS = "GET_DIRECTIONS"








export function addDirections(directions) {

    return {
        type: ADD_DIRECTIONS,
        DIRECTIONS: directions
    }

}


export function deleteDirections(directions) {

    return {
        type: DELETE_DIRECTIONS,
        DIRECTIONS: directions
    }

}

export function updateDirections(directions) {

    return {
        type: UPDATE_DIRECTIONS,
        DIRECTIONS: directions
    }

}

export function getDirections(directions) {

    return {
        type: GET_DIRECTIONS,
        recipe_id: directions.recipe_id,
        DIRECTIONS: directions
    }

}