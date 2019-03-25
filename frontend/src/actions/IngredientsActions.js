
export const ADD_INGREDIENTS = "ADD_INGREDIENTS"
export const DELETE_INGREDIENTS = "DELETE_INGREDIENTS"
export const UPDATE_INGREDIENTS = "UPDATE_INGREDIENTS"
export const GET_INGREDIENTS = "GET_INGREDIENTS"








export const addIngredients = (ingredients) => (dispatch) => {

    dispatch({
        type: ADD_INGREDIENTS,
        payload: {ingredients}
    })

}


export const deleteIngredients = (ingredients) => (dispatch) => {

    dispatch({
        type: DELETE_INGREDIENTS,
        payload: {ingredients}
    })

}

export const updateIngredients = (ingredients) => (dispatch) => {

    dispatch({
        type: UPDATE_INGREDIENTS,
        payload: {ingredients}
    })

}

export const getIngredients = (ingredients) => (dispatch) => {

    dispatch({
        type: GET_INGREDIENTS,
        payload: {ingredients, ing_id: ingredients.ing_id}
    })

}