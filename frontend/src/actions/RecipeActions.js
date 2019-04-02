import axios from 'axios';
export const ADD_RECIPE = "ADD_RECIPE"

export const ADD_RECIPE_SUCCESS = "ADD_RECIPE_SUCCESS"
export const GET_RECIPES = "GET_RECIPES"
export const DELETE_RECIPE = "DELETE_RECIPE"
export const UPDATE_RECIPE = "UPDATE_RECIPE"
export const GET_SELECTED_RECIPE = "GET_SELECTED_RECIPE"








export const addRecipe = (recipe) => (dispatch) => {
    console.log(recipe.recipe_id)
    let id = 1
    // needs to be an axios.post
    // axios.get(`https://kookr.herokuapp.com/api/recipes/user/${id}`).then((res) => {
    //     console.log(res)
    //     console.log(res.data)
    // })
    dispatch({
        type: ADD_RECIPE,
        payload: {recipe, recipe_id: recipe.recipe_id}
    })

}

export const getRecipes = (userid) => (dispatch) => {
    //console.log(recipe.recipe_id)
    let uesrid = 1
    let responseValue
    axios.get(`https://kookr.herokuapp.com/api/recipes/user/${userid}`).then((res) => {
         
        console.log(res)
        console.log(res.data)
        //makes the array and array of objects
        responseValue = Object.values(res.data)
        //gives each new object an isSelected value of false
        responseValue.map(obj =>  obj.isSelected = false)
        return responseValue
    }).then(returnedValue => {
        console.log(returnedValue)
        dispatch({
            type: GET_RECIPES,
            payload: {userid, recipes: returnedValue}
        })

    })
    //console.log(responseValue)
    

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

export const addRecipeSuccess = (recipe) => (dispatch) => {

    dispatch({
        type: ADD_RECIPE_SUCCESS,
    })

}