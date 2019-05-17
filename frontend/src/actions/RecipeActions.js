import axios from 'axios';

export const ADD_RECIPE = "ADD_RECIPE"

export const ADD_RECIPE_SUCCESS = "ADD_RECIPE_SUCCESS"
export const GET_RECIPES = "GET_RECIPES"
export const DELETE_RECIPE = "DELETE_RECIPE"
export const UPDATE_RECIPE = "UPDATE_RECIPE"
export const GET_SELECTED_RECIPE = "GET_SELECTED_RECIPE"
export const GET_RECIPES_BY_TAG = "GET_RECIPES_BY_TAG"
export const FILTER_RECIPES = "FILTER_RECIPES"
export const GET_RECIPES_BY_ID = "GET_RECIPES_BY_ID"
export const UPDATE_SCHEDULE_BY_ID = "UPDATE_SCHEDULE_BY_ID"
export const ADD_RECIPE_SCH = "ADD_RECIPE_SCH"

export const getRecipesByIDSTART = (recipe_id, userid) => {
    return dispatch => {
      
        dispatch(getRecipeByIdEND(recipe_id, userid))
       
    }
}

export const getRecipeByIdEND = (recipe_id, userid) =>  (dispatch) => {
  
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
          //sets the object bestdate properly
               axios.get(`https://kookr.herokuapp.com/api/tags/`).then(res =>  {
                
               for( let i = 0; i < res.data.length-1; i++) {
                   
                   if(latestDates[i] && res.data[i].tag_id === latestDates[i].tag_id) {
                       latestDates[i].tag = res.data[i].tag
                       
                   } 
               }
              
               
               return latestDates
           }).then((latestDates) => {

               //loops through the tags api response and the recipes, 
               //matches with the correct recipe and sets the bestdate object
               for(let i = 0; i < returnedValue.length; i++) {
               if(latestDates[i] === undefined){       
                } else {
                    if(latestDates[i].recipe_id === returnedValue[i].recipe_id){
                        returnedValue[i].bestdate = latestDates[i]
                    }
                }  
               }
            
           return returnedValue
           })
           .then(needDetail => {
           
            
            const getRecipes = needDetail.map((detail) => {
               return axios.get(`https://kookr.herokuapp.com/api/recipes/${detail.recipe_id}`)
                
            })


            axios.all(getRecipes)
                 .then(axios.spread((...res)=> {
                            res.forEach((recipe, index) => {
                            
                    
                    needDetail[index].directions = recipe.data.directions
                    needDetail[index].ingredients = recipe.data.ingredients
     

                            })

                            dispatch({
                                type: GET_RECIPES_BY_ID,
                                payload: {recipe_id, recipes: needDetail}
                            })
                    }
                    ))
                 .catch(err => console.error(err.response))
         
       
           })

      })

   })


}

export const addRecipe = (recipe) => (dispatch) => {
    
    dispatch({
        type: ADD_RECIPE,
        payload: {recipe, recipe_id: recipe.recipe_id}
    })

}





export const getRecipes2 = (userid) => (dispatch) => {

 
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
        
            let uniqueRecipeIds =[]
            
            //need this for unique recipe ids
             for(i = 0; i < res.data.length; i++){
             
                if(uniqueRecipeIds.includes(res.data[i].recipe_id) === false) {
                    uniqueRecipeIds.push(res.data[i].recipe_id)
                    
                }
            }
    
       
            
    
    
    
            //groups scheduled dates by recipe_ids
            let arrayOfArrays = []
            for(i = 0; i < res.data.length; i++) {
                arrayOfArrays.push(res.data.filter(item => res.data[i].recipe_id === item.recipe_id))

            }

           
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
            
           
    
           
           latestDates.sort((a, b) => parseInt(a.id) - parseInt(b.id))

            return latestDates 
    
       }).then((latestDates) => {
       

           latestDates.sort((a, b) => {
            let value = parseInt(a.id) - parseInt(b.id)
            if(value !== 0) {
                return value
            }
            return parseInt(a.tag_id) - parseInt(b.tag_id)
           } )
       

                axios.get(`https://kookr.herokuapp.com/api/tags/`).then(res =>  {
                   
                let testValue = latestDates.forEach(latest => {

                    res.data.forEach(tag => {

                        if(latestDates && latest.tag_id === tag.tag_id) {
                            latest.tag = tag.tag
                        }
                    })
                })
                
                
                return latestDates
            }).then((latestDates) => {

                for(let i = 0; i < returnedValue.length; i++) {

                    if(latestDates[i] === undefined){
                       
                    } else {
                        const index = latestDates.findIndex(element => element.recipe_id === returnedValue[i].recipe_id)
                        returnedValue[i].bestdate = latestDates[index]
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
export function getRecipes(userid) {
    return dispatch => {
        //setTimeout(() => {
        dispatch(getRecipes2(userid))
        //}, 1000)
    }
}


function deleteRecipe2(recipe, userid) {
    

    axios.delete(`https://kookr.herokuapp.com/api/recipes/${recipe.recipe_id}/user/${userid}`)
     .catch(err => console.error({err}))

    return {
        type: DELETE_RECIPE,
        payload: {recipe, recipe_id: recipe.recipe_id}
    };

   
}


export const deleteRecipe = (recipe, userid) => {
    return dispatch => {
      
            dispatch(deleteRecipe2(recipe, userid))
    
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

function UpdateScheduleById2(scheduledDateID, scheduleObject) {
    //axios call
    axios.put(`https://kookr.herokuapp.com/api/schedule/${scheduledDateID}`,scheduleObject)

        .catch(err => console.error(err))

    return {
        type: UPDATE_SCHEDULE_BY_ID,
        payload: scheduleObject
    }
}

export const UpdateScheduleByID = (scheduledDateID, scheduleObject) => {

    return  dispatch => {
       
            dispatch(UpdateScheduleById2(scheduledDateID, scheduleObject))
           
    }
}

// export const addRecipe = (recipe) => (dispatch) => {
    
//     // let id = 1
//     // return dispatch => {
//     //     dispatch(addRecipe2(recipe))
//     // }
//     dispatch({
//         type: ADD_RECIPE,
//         payload: {recipe, recipe_id: recipe.recipe_id}
//     })

// }


function addRecipeSch2(recipeSch) {
    
    axios.post(`https://kookr.herokuapp.com/api/schedule`,recipeSch)
    
        .catch(err => {
            console.error(err)
        })

    return {
        type: ADD_RECIPE_SCH,
        payload: []
    }
} 

export const addRecipeSch = (recipeSch)  => {
    
    // let id = 1
    return dispatch => {
        dispatch(addRecipeSch2(recipeSch))
    }
  

}