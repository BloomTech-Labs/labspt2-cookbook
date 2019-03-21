
export const ADD_RECIPE = "ADD_RECIPE"
export const DELETE_RECIPE = "DELETE_RECIPE"
export const UPDATE_RECIPE = "UPDATE_RECIPE"
export const GET_SELECTED_RECIPE = "GET_SELECTED_RECIPE"








export const addRecipe = (recipe) => (dispatch) => {

    dispatch({
        type: ADD_RECIPE,
        payload: {recipe, recipe_id: recipe.recipe_id}
    })

}

export const deleteRecipe = (recipe) => (dispatch) => {

    dispatch({
        type: DELETE_RECIPE,
        payload: {recipe, recipe_id: recipe.recipe_id}
    })

}

export const updateRecipe = (recipe) => (dispatch) => {

    dispatch({
        type: UPDATE_RECIPE,
        payload: {recipe, recipe_id: recipe.recipe_id}
    })

}

export const getSelectedRecipe = (recipe) => (dispatch) => {

    dispatch({
        type: GET_SELECTED_RECIPE,
        payload: {recipe, recipe_id: recipe.recipe_id, isSelected: true}
    })

}
