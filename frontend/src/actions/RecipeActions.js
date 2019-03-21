
export const ADD_RECIPE = "ADD_RECIPE"
export const DELETE_RECIPE = "DELETE_RECIPE"
export const UPDATE_RECIPE = "UPDATE_RECIPE"
export const GET_SELECTED_RECIPE = "GET_SELECTED_RECIPE"








export function addRecipe(recipe) {

    return {
        type: ADD_RECIPE,
        recipe_id: recipe.recipe_id,
        RECIPE: recipe
    }

}

export function deleteRecipe(recipe) {

    return {
        type: DELETE_RECIPE,
        recipe_id: recipe.recipe_id,
        RECIPE: recipe
    }

}

export function updateRecipe(recipe) {

    return {
        type: UPDATE_RECIPE,
        recipe_id: recipe.recipe_id,
        RECIPE: recipe
    }

}

export function getSelectedRecipe(recipe) {

    return {
        type: GET_SELECTED_RECIPE,
        recipe_id: recipe.recipe_id,
        isSelected: true,
        RECIPE: recipe
    }

}
