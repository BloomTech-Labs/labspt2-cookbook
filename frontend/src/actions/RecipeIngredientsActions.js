
export const ADD_RECIPE_INGREDIENTS = "ADD_RECIPE_INGREDIENTS"
export const DELETE_RECIPE_INGREDIENTS = "DELETE_RECIPE_INGREDIENTS"
export const UPDATE_RECIPE_INGREDIENTS = "UPDATE_RECIPE_INGREDIENTS"
export const GET_RECIPE_INGREDIENTS = "GET_RECIPE_INGREDIENTS"








export const addRecipeIngredients = (recipeingredients) => (dispatch) => {

    dispatch({
        type: ADD_RECIPE_INGREDIENTS,
        payload: {recipeingredients}
    })

}


export const deleteRecipeIngredients = (recipeingredients) => (dispatch) => {

    dispatch({
        type: DELETE_RECIPE_INGREDIENTS,
        payload: {recipeingredients}
    })

}

export const updateRecipeIngredients = (recipeingredients) => (dispatch) => {

    dispatch({
        type: UPDATE_RECIPE_INGREDIENTS,
        payload: {recipeingredients}
    })

}

export const getRecipeIngredients = (recipeingredients) => (dispatch) => {

    dispatch({
        type: GET_RECIPE_INGREDIENTS,
        payload: {recipeingredients, recipe_id: recipeingredients.recipe_id}
    })

}