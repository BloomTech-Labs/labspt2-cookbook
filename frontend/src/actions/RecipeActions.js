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
        //unique number of recipes
        
        //how for loop working 
        
        // for(let i = 0; i < returnedValue.length; i++) {          
        //     if(filteredArray.indedOf(returnedValue[i])== -1) {
        //         filteredArray.push(returnedValue[i])
        //     }
        // }

        // for(let i = 0; i< returnedValue.length; i++) {
        //     if(returnedValue[i])
        // }
        let filteredArrayLength = 3
    
//get schedule axios
        
        // axios.get(`https://kookr.herokuapp.com/api/schedule/user/${userid}`).then((items) => {
        //     console.log(items.data)

        //     let datesArray = [items.data]

        //     let today = new Date().toISOString()

        //     //what did I do

          
        //   const sortedDatesArray = datesArray.map(ele => [...ele, { date: today }]).map(recipe => recipe.sort((a, b) => a.date > b.date))
        //   console.log(sortedDatesArray)
        //   const lastestDates = sortedDatesArray.map(element => {
        //     const todayIndex = element.findIndex(ele => ele.date === today)
        //     console.log(todayIndex)
        //     if (todayIndex === 0) {
        //       return element[todayIndex]
        //     } else if (element[todayIndex + 1]) {
        //       return element[todayIndex + 1]
        //     } else {
        //       return element[todayIndex - 1]
        //     }
        //   })
          
        //   console.log(lastestDates)


        // })

        // const datesArray = [
        //     [{ recipe_id: 1, date: "2019-04-17T00:00:00.000Z" },
        //     { recipe_id: 1, date: "2019-04-23T00:00:00.000Z" }
        //     ],
          
        //     [{ recipe_id: 2, date: "2019-04-06T00:00:00.000Z" }],
          
        //     [{ recipe_id: 3, date: "2019-04-06T00:00:00.000Z" },
          
        //       { recipe_id: 3, date: "2019-04-01T00:00:00.000Z" },
          
        //       { recipe_id: 3, date: "2019-04-19T00:00:00.000Z" },
          
        //       { recipe_id: 3, date: "2019-04-16T00:00:00.000Z" }],
        //   ]
          
        //   const today = new Date().toISOString()
          
        //   const sortedDatesArray = datesArray.map(ele => [...ele, { date: today }]).map(recipe => recipe.sort((a, b) => a.date > b.date))
        //   const lastestDates = sortedDatesArray.map(element => {
        //     const todayIndex = element.findIndex(ele => ele.date === today)
        //     console.log(todayIndex)
        //     if (todayIndex === 0) {
        //       return element[todayIndex]
        //     } else if (element[todayIndex + 1]) {
        //       return element[todayIndex + 1]
        //     } else {
        //       return element[todayIndex - 1]
        //     }
        //   })
          
        //   console.log(lastestDates)
        

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

// function getRecipesByDate2(recipes) {
//     return {
//         type: GET_RECIPES_BY_DATE,
//         payload: {recipes}
//     }
// }

// export function getRecipesByDate(datesArray) {



//     return dispach => {
//         dispatch(getRecipesByDate2(recipes))
//     }
// }