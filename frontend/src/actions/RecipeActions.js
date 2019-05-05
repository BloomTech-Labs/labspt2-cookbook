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
export const GET_RECIPES_BY_ID = "GET_RECIPES_BY_ID"


export const getRecipesByIDSTART = (recipe_id, userid) => {
    return dispatch => {
      //  setTimeout(() => {
        dispatch(getRecipeByIdEND(recipe_id, userid))
       // }, 1000)
    }
}

export const getRecipeByIdEND = (recipe_id, userid) => async (dispatch) => {
  
   let uniqueRecipeIds =[]
   let responseValue
   let finalValue
   await axios.get(`https://kookr.herokuapp.com/api/recipes/user/${userid}`).then((res) => {
        console.log(res)
   
       //makes the array and array of objects
       responseValue = Object.values(res.data)
       //gives each new object an isSelected value of false
       responseValue.map(obj => obj.isSelected = false,)
       responseValue.map(obj => obj.bestdate = [])
    
       return responseValue
   }).then(returnedValue => {
      
       
       let latestDates 
       axios.get(`https://kookr.herokuapp.com/api/schedule/user/${userid}`).then(res => {
           
           let i
           let Recip = [] 
  
           let uniqueRecipeIds =[]
           
           //need this for unique recipe ids
            for(i = 0; i < res.data.length; i++){
          
               if(uniqueRecipeIds.includes(res.data[i].recipe_id) === false) {
                   uniqueRecipeIds.push(res.data[i].recipe_id)
                
               }
           }
           //groups scheduled dates by recipe_ids
           let arrayOfArrays = []
           for(i = 0; i < uniqueRecipeIds.length; i++) {
               arrayOfArrays.push(res.data.filter(item => res.data[i].recipe_id === item.recipe_id))
               }
           let length = arrayOfArrays[0].length
           let uptoDateArray = []
          
           const today = new Date().toISOString()
               //inserts todays date into every array within the arrayofarrays and sorts
           const sortedDatesArray = arrayOfArrays.map(ele => [...ele, { date: today }]).map(recipe => recipe.sort((a, b) => a.date > b.date))
               //item to the left is the closest before date. item to the right is the closest after date.
           latestDates = sortedDatesArray.map(element => {
             const todayIndex = element.findIndex(ele => ele.date === today)
             
             if (todayIndex === 0) {
               return element[todayIndex]
             } else if (element[todayIndex + 1]) {
               return element[todayIndex + 1]
             } else {
               return element[todayIndex - 1]
             }
           })
           return latestDates 
   
      }).then((latestDates) => {
               axios.get(`https://kookr.herokuapp.com/api/tags/`).then(res =>  {
                  
               for( let i = 0; i < res.data.length-1; i++) {
                   
                   if(latestDates[i] && res.data[i].tag_id === latestDates[i].tag_id) {
                       latestDates[i].tag = res.data[i].tag
                       
                   } 
               }
               // dispatch({
               //     type: ADD_TAG,
               //     payload: {recipe_id, tags: res.data}
               // })
                   
               
           
               
               return latestDates
           }).then((latestDates) => {
               let i 
               for(let i = 0; i < returnedValue.length; i++) {
               if(latestDates[i] === undefined){       
                } else {
                    if(latestDates[i].recipe_id === returnedValue[i].recipe_id){
                        returnedValue[i].bestdate = latestDates[i]
                    }
                }  
               }
               console.log(returnedValue)
               finalValue = returnedValue
               console.log(finalValue)
      
           return returnedValue
           })
           .then(needDetail => {

            for(let k = 0; k < returnedValue.length; k++){
                axios.get(`https://kookr.herokuapp.com/api/recipes/${returnedValue[k].recipe_id}`).then(res => {
                    console.log(k)
                //    res = JSON.parse(JSON.stringify(res))

                //     needDetail = JSON.parse(JSON.stringify(needDetail))
                //     console.log(needDetail)

                    needDetail[k].something = ['SOMETHING ELSE']
                
                console.log(res.data.directions)
                   // needDetail[k].directions = res.data.directions
                let values = {
                    directions: res.data.directions,
                    ingredients: res.data.ingredients
                }

                    // needDetail[k] = {...needDetail[k], ...values}

                   // needDetail[k].ingredients = res.data.ingredients
               })
            }
            console.log(Object.keys(needDetail[0]))
            dispatch({
                type: GET_RECIPES_BY_ID,
                payload: {recipe_id, recipes: needDetail}
            })
            //    axios.get(`https://kookr.herokuapp.com/api/recipes/${recipe_id}`).then(res => {
            //        console.log(res)
            //    })
           })

      })

   })
//    console.log(finalValue)
   
//    return {
//     type: GET_RECIPES_BY_ID,
//     payload: {recipe_id, recipes: finalValue}
//     } 
//    dispatch({
//     type: GET_RECIPES_BY_ID,
//     payload: {recipe_id, recipes: returnedValue}
// })

}

export const addRecipe = (recipe) => (dispatch) => {
    
    let id = 1
 
    dispatch({
        type: ADD_RECIPE,
        payload: {recipe, recipe_id: recipe.recipe_id}
    })

}





export const getRecipes2 = (userid) => (dispatch) => {

 
    let uniqueRecipeIds =[]
    let responseValue
    axios.get(`https://kookr.herokuapp.com/api/recipes/user/${userid}`).then((res) => {
   
        //makes the array and array of objects
        responseValue = Object.values(res.data)
        //gives each new object an isSelected value of false
        responseValue.map(obj => obj.isSelected = false,)
        responseValue.map(obj => obj.bestdate = [])
        
        return responseValue
    }).then(returnedValue => {
     
        
        let latestDates 
        axios.get(`https://kookr.herokuapp.com/api/schedule/user/${userid}`).then(res => {
            
            let i
            let Recip = [] 
        
            let uniqueRecipeIds =[]
            
            //need this for unique recipe ids
             for(i = 0; i < res.data.length; i++){
             
                if(uniqueRecipeIds.includes(res.data[i].recipe_id) === false) {
                    uniqueRecipeIds.push(res.data[i].recipe_id)
                    
                }
            }
    
       
    
    
    
    
            //groups scheduled dates by recipe_ids
            let arrayOfArrays = []
            for(i = 0; i < uniqueRecipeIds.length; i++) {
                arrayOfArrays.push(res.data.filter(item => res.data[i].recipe_id === item.recipe_id))
                }
    
           
          
    
    
    
            let length = arrayOfArrays[0].length
            let uptoDateArray = []
           
            const today = new Date().toISOString()
                //inserts todays date into every array within the arrayofarrays and sorts
            const sortedDatesArray = arrayOfArrays.map(ele => [...ele, { date: today }]).map(recipe => recipe.sort((a, b) => a.date > b.date))
                //item to the left is the closest before date. item to the right is the closest after date.
            latestDates = sortedDatesArray.map(element => {
              const todayIndex = element.findIndex(ele => ele.date === today)
           
              if (todayIndex === 0) {
                return element[todayIndex]
              } else if (element[todayIndex + 1]) {
                return element[todayIndex + 1]
              } else {
                return element[todayIndex - 1]
              }
            })
            
           
    
           
    
            return latestDates 
    
       }).then((latestDates) => {
       
     
           
                axios.get(`https://kookr.herokuapp.com/api/tags/`).then(res =>  {
                  
                for( let i = 0; i < res.data.length-1; i++) {
                     
                    if(latestDates[i] && res.data[i].tag_id === latestDates[i].tag_id) {
                        latestDates[i].tag = res.data[i].tag
                       
                    } 
                }
                // dispatch({
                //     type: ADD_TAG,
                //     payload: {userid, tags: res.data}
                // })
                    
                
            
                
                return latestDates
            }).then((latestDates) => {
                console.log(latestDates)
                console.log(returnedValue)
                let i 
                for(let i = 0; i < returnedValue.length; i++) {
                    let trueOrFalse =[]
                    let badValues
                    // if(returnedValue.length > latestDates.length) {

                    // }
                    // returnedValue.array.forEach(element => {
                    //     if(element.recipe_id !== latestDates[i].recipe_id) {
                    //         trueOrFalse = false;
                    //     } else {
                    //         trueOrFalse = true;
                    //     }
                    // });
                    if(latestDates[i] === undefined){
                       
                    } else {
                        if(latestDates[i].recipe_id === returnedValue[i].recipe_id){
                            returnedValue[i].bestdate = latestDates[i]
                        }
                    }
                    // if(latestDates[i].recipe_id === returnedValue[i].recipe_id){
                    //     returnedValue[i].bestdate = latestDates[i]
                    // } else {
                    //     badValues = returnedValue[0].recipe_id
                    // }
                    
                }
                 dispatch({
                type: GET_RECIPES,
                payload: {userid, recipes: returnedValue}
            })
                

            })
            
       


           


       

       })
        
        
        
        
        
        
        
   
    


    })
    

}
export function getRecipes(userid) {
    return dispatch => {
        //setTimeout(() => {
        dispatch(getRecipes2(userid))
        //}, 1000)
    }
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
export function deleteRecipe(recipe, userid) {
    return dispatch => {
       // setTimeout(() => {
            dispatch(deleteRecipe2(recipe, userid))
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

function getRecipesByTag2(tag) {

//axios calls 

    return {
        type: GET_RECIPES_BY_TAG,
        payload: {tag: tag}
    }
}

export const getRecipesByTag = (tag) => {
  
    return dispatch => {
        setTimeout(() => {
        dispatch(getRecipesByTag2(tag))
        }, 1000)
    }
    
}

