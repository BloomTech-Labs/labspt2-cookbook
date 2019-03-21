
export const ADD_INGREDIENTS = "ADD_INGREDIENTS"
export const DELETE_INGREDIENTS = "DELETE_INGREDIENTS"
export const UPDATE_INGREDIENTS = "UPDATE_INGREDIENTS"
export const GET_INGREDIENTS = "GET_INGREDIENTS"








export function addIngredients(ingredients) {

    return {
        type: ADD_INGREDIENTS,
        INGREDIENTS: ingredients
    }

}


export function deleteIngredients(ingredients) {

    return {
        type: DELETE_INGREDIENTS,
        INGREDIENTS: ingredients
    }

}

export function updateIngredients(ingredients) {

    return {
        type: UPDATE_INGREDIENTS,
        INGREDIENTS: ingredients
    }

}

export function getIngredients(ingredients) {

    return {
        type: GET_INGREDIENTS,
        recipe_id: ingredients.recipe_id,
        INGREDIENTS: ingredients
    }

}