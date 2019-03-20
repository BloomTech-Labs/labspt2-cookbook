
export const ADD_RECIPE_INGREDIENTS = "ADD_RECIPE_INGREDIENTS"
export const DELETE_RECIPE_INGREDIENTS = "DELETE_RECIPE_INGREDIENTS"
export const UPDATE_RECIPE_INGREDIENTS = "UPDATE_RECIPE_INGREDIENTS"
export const GET_RECIPE_INGREDIENTS = "GET_RECIPE_INGREDIENTS"








export function addRecipeIngredients(recipeingredients) {

    return {
        type: ADD_RECIPE_INGREDIENTS,
        ADD_RECIPE_INGREDIENTS: recipeingredients
    }

}


export function deleteRecipeIngredients(recipeingredients) {

    return {
        type: DELETE_RECIPE_INGREDIENTS,
        RECIPE_INGREDIENTS: recipeingredients
    }

}

export function updateRecipeIngredients(recipeingredients) {

    return {
        type: UPDATE_RECIPE_INGREDIENTS,
        RECIPE_INGREDIENTS: recipeingredients
    }

}

export function getRecipeIngredients(recipeingredients) {

    return {
        type: GET_RECIPE_INGREDIENTS,
        recipe_id: recipeingredients.recipe_id,
        RECIPE_INGREDIENTS: recipeingredients
    }

}