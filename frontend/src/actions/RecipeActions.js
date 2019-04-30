import axios from 'axios';
import {ADD_TAG} from '../actions/TagsActions';
export const ADD_RECIPE = "ADD_RECIPE"

export const ADD_RECIPE_SUCCESS = "ADD_RECIPE_SUCCESS"
export const GET_RECIPES = "GET_RECIPES"
export const DELETE_RECIPE = "DELETE_RECIPE"
export const UPDATE_RECIPE = "UPDATE_RECIPE"
export const GET_SELECTED_RECIPE = "GET_SELECTED_RECIPE"
export const GET_RECIPES_BY_TAG = "GET_RECIPES_BY_TAG"
export const FILTER_RECIPES = "FILTER_RECIPES"






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

// export const getRecipes = (userid) => (dispatch) => {
//     //console.log(recipe.recipe_id)
//     let uesrid = 1
//     let responseValue
//     axios.get(`https://kookr.herokuapp.com/api/recipes/user/${userid}`).then((res) => {
         
//         console.log(res)
//         console.log(res.data)
//         //makes the array and array of objects
//         responseValue = Object.values(res.data)
//         //gives each new object an isSelected value of false
//         responseValue.map(obj =>  obj.isSelected = false)
//         return responseValue
//     }).then(returnedValue => {
//         console.log(returnedValue)
//         //unique number of recipes
        
//         //how for loop working 
        
//         // for(let i = 0; i < returnedValue.length; i++) {          
//         //     if(filteredArray.indedOf(returnedValue[i])== -1) {
//         //         filteredArray.push(returnedValue[i])
//         //     }
//         // }

//         // for(let i = 0; i< returnedValue.length; i++) {
//         //     if(returnedValue[i])
//         // }
//         let filteredArrayLength = 3
    
// //get schedule axios
        
//         // axios.get(`https://kookr.herokuapp.com/api/schedule/user/${userid}`).then((items) => {
//         //     console.log(items.data)

//         //     let datesArray = [items.data]

//         //     let today = new Date().toISOString()

//         //     //what did I do

          
//         //   const sortedDatesArray = datesArray.map(ele => [...ele, { date: today }]).map(recipe => recipe.sort((a, b) => a.date > b.date))
//         //   console.log(sortedDatesArray)
//         //   const lastestDates = sortedDatesArray.map(element => {
//         //     const todayIndex = element.findIndex(ele => ele.date === today)
//         //     console.log(todayIndex)
//         //     if (todayIndex === 0) {
//         //       return element[todayIndex]
//         //     } else if (element[todayIndex + 1]) {
//         //       return element[todayIndex + 1]
//         //     } else {
//         //       return element[todayIndex - 1]
//         //     }
//         //   })
          
//         //   console.log(lastestDates)


//         // })

//         // const datesArray = [
//         //     [{ recipe_id: 1, date: "2019-04-17T00:00:00.000Z" },
//         //     { recipe_id: 1, date: "2019-04-23T00:00:00.000Z" }
//         //     ],
          
//         //     [{ recipe_id: 2, date: "2019-04-06T00:00:00.000Z" }],
          
//         //     [{ recipe_id: 3, date: "2019-04-06T00:00:00.000Z" },
          
//         //       { recipe_id: 3, date: "2019-04-01T00:00:00.000Z" },
          
//         //       { recipe_id: 3, date: "2019-04-19T00:00:00.000Z" },
          
//         //       { recipe_id: 3, date: "2019-04-16T00:00:00.000Z" }],
//         //   ]
          
//         //   const today = new Date().toISOString()
          
//         //   const sortedDatesArray = datesArray.map(ele => [...ele, { date: today }]).map(recipe => recipe.sort((a, b) => a.date > b.date))
//         //   const lastestDates = sortedDatesArray.map(element => {
//         //     const todayIndex = element.findIndex(ele => ele.date === today)
//         //     console.log(todayIndex)
//         //     if (todayIndex === 0) {
//         //       return element[todayIndex]
//         //     } else if (element[todayIndex + 1]) {
//         //       return element[todayIndex + 1]
//         //     } else {
//         //       return element[todayIndex - 1]
//         //     }
//         //   })
          
//         //   console.log(lastestDates)
        

//         console.log(returnedValue)
      
//         dispatch({
//             type: GET_RECIPES,
//             payload: {userid, recipes: returnedValue}
//         })

//     })
//     //console.log(responseValue)
    

// }

export const getRecipes = (userid) => (dispatch) => {

    //console.log(recipe.recipe_id)
    let uniqueRecipeIds =[]
    let responseValue
    axios.get(`https://kookr.herokuapp.com/api/recipes/user/${userid}`).then((res) => {
         
        console.log(res)
        console.log(res.data)
        //makes the array and array of objects
        responseValue = Object.values(res.data)
        //gives each new object an isSelected value of false
        responseValue.map(obj => obj.isSelected = false,)
        responseValue.map(obj => obj.bestdate = [])
        console.log(responseValue)
        return responseValue
    }).then(returnedValue => {
        console.log(returnedValue)
        
        let latestDates 
        axios.get(`https://kookr.herokuapp.com/api/schedule/user/${userid}`).then(res => {
            console.log(res.data)
            let i
            let Recip = [] 
            console.log(res.data[0])
            console.log(res.data.length)
            let uniqueRecipeIds =[]
            
            //need this for unique recipe ids
             for(i = 0; i < res.data.length; i++){
                console.log(uniqueRecipeIds.includes(res.data[i].recipe_id))
                if(uniqueRecipeIds.includes(res.data[i].recipe_id) === false) {
                    uniqueRecipeIds.push(res.data[i].recipe_id)
                    console.log(uniqueRecipeIds)
                }
            }
    
            // for(i = 0; i < res.data.length; i++){
            //     console.log(res.data[i].recipe_id)
            //     Recip.push({recipe_id: res.data[i].recipe_id, date: res.data[i].date})
            // }
            // //inserts a test 
            // Recip.push({recipe_id: 3, date: '2019-04-01T00:00:00.000Z' })
            // Recip.push({recipe_id: 3, date: '2019-04-18T00:00:00.000Z' })
            // Recip.push({recipe_id: 3, date: '2019-04-17T00:00:00.000Z' })
            // Recip.push({recipe_id: 2, date: '2019-04-07T00:00:00.000Z' })
            // console.log(Recip)
    
    
    
    
            //groups scheduled dates by recipe_ids
            let arrayOfArrays = []
            for(i = 0; i < uniqueRecipeIds.length; i++) {
                arrayOfArrays.push(res.data.filter(item => res.data[i].recipe_id === item.recipe_id))
                }
    
            console.log(arrayOfArrays)
          
    
    
    
            let length = arrayOfArrays[0].length
            let uptoDateArray = []
           
            const today = new Date().toISOString()
                //inserts todays date into every array within the arrayofarrays and sorts
            const sortedDatesArray = arrayOfArrays.map(ele => [...ele, { date: today }]).map(recipe => recipe.sort((a, b) => a.date > b.date))
                //item to the left is the closest before date. item to the right is the closest after date.
            latestDates = sortedDatesArray.map(element => {
              const todayIndex = element.findIndex(ele => ele.date === today)
              console.log(todayIndex)
              if (todayIndex === 0) {
                return element[todayIndex]
              } else if (element[todayIndex + 1]) {
                return element[todayIndex + 1]
              } else {
                return element[todayIndex - 1]
              }
            })
            
            console.log(latestDates)
    
           
    
            return latestDates 
    
       }).then((latestDates) => {
           console.log(latestDates.length)

           
                axios.get(`https://kookr.herokuapp.com/api/tags/`).then(res =>  {
                    console.log(res.data)
                for( let i = 0; i < res.data.length-1; i++) {
                     console.log(res.data[i].tag)
                    if(latestDates[i] && res.data[i].tag_id === latestDates[i].tag_id) {
                        latestDates[i].tag = res.data[i].tag
                        console.log(latestDates)
                    } 
                }
                dispatch({
                    type: ADD_TAG,
                    payload: {userid, tags: res.data}
                })
            
                
                return latestDates
            }).then((latestDates) => {
                let i 
                for(let i = 0; i < returnedValue.length; i++) {
                    console.log(latestDates[i].recipe_id)
                    if(latestDates[i].recipe_id === returnedValue[i].recipe_id){
                        returnedValue[i].bestdate = latestDates[i]
                        console.log(returnedValue[i])
                    }
                }
                 dispatch({
                type: GET_RECIPES,
                payload: {userid, recipes: returnedValue}
            })
                

            })
            
       


           


       

       })
        
        
        
        
        
        
        
   
    


    })
    

}

function deleteRecipe2(recipe, userid) {
    // dont want to delete yet
    // do no uncomment
    // axios.delete(`https://kookr.herokuapp.com/api/recipes/${recipe.recipe_id}/user/${userid}`)
    // .then(res => {

    //     return {
    //         type: DELETE_RECIPE,
    //         payload: {recipe, recipe_id: recipe.recipe_id}
    //     };

    //     console.log('deleted successfully')
    // })
    // .catch(err => console.log({err}))
    // comment out the below when the above is live.
    return {
        type: DELETE_RECIPE,
        payload: {recipe, recipe_id: recipe.recipe_id}
    };

   
}
//reference the below to get the function to delay
export function deleteRecipe(recipe, dispatch) {
    return dispatch => {
       // setTimeout(() => {
            dispatch(deleteRecipe2(recipe))
      //  }, 3000)
    }
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

function getRecipesByTag2(tag) {
    return {
        type: GET_RECIPES_BY_TAG,
        payload: {tag: tag}
    }
}

export function getRecipesByTag(tag, dispatch) {
    //console.log(tag)
    return dispatch => {
        setTimeout(() => {
        dispatch(getRecipesByTag2(tag))
        }, 1000)
    }
    
}