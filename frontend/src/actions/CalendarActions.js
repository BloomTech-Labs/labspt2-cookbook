import axios from "axios";

export const ADD_CALENDAR_ITEM = "ADD_CALENDAR_ITEM"
export const DELETE_CALENDAR_ITEM = "DELETE_CALENDAR_ITEM"
export const UPDATE_CALENDAR_ITEM = "UPDATE_CALENDAR_ITEM"
export const GET_CALENDAR_ITEM = "GET_CALENDAR_ITEM"
export const ADD_CALENDAR_ITEMS = "ADD_CALENDAR_ITEM"
export const GET_ALL_SCHEDULE_ITEMS = "GET_ALL_SCHEDULE_ITEMS"




function getScheduleItems2(sch) {
  
    return {
        type: GET_ALL_SCHEDULE_ITEMS,
        payload: {sch: sch}
    }
}

export function getScheduleItems(userid) {
    let id = 1

    let latestDates 
    axios.get(`https://kookr.herokuapp.com/api/schedule/user/${id}`).then(res => {
       
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
     
       
            axios.get(`https://kookr.herokuapp.com/api/tags/`).then(res =>  {
              
            for( let i = 0; i < res.data.length-1; i++) {
                
                if(latestDates[i] && res.data[i].tag_id === latestDates[i].tag_id) {
                    latestDates[i].tag = res.data[i].tag
                    
                } 
            }
           
           
        })

   })

   return dispatch => {  
    dispatch(getScheduleItems2(latestDates))
}
}

export const addCalendarItem = (calendaritem) => (dispatch) => {

    dispatch({
        type: ADD_CALENDAR_ITEM,
        payload: {calendaritem} 
    })

}


export const deleteCalendarItem = (calendaritem) => (dispatch) => {

    dispatch({
        type: DELETE_CALENDAR_ITEM,
        payload: {calendaritem}
    })

}

export const updateCalendarItem = (calendaritem) => (dispatch) => {

    dispatch({
        type: UPDATE_CALENDAR_ITEM,
        payload: {calendaritem}
    })
}

export function getCalendarItem(calendaritem) {
    return dispatch => {
        
        dispatch(getCalendarItem2(calendaritem))
    }
}

function getCalendarItem2(calendaritem) {
    

    return {
        type: GET_CALENDAR_ITEM,
        payload: {calendaritem, recipe_id: calendaritem.recipe_id }
    }

}

function addAllToCalendar2() {
    return {
        type: ADD_CALENDAR_ITEMS
    }
}

export function addAllToCalendar(arrayOfSchedules) {
    arrayOfSchedules.forEach(recipePost => {
        axios
            .post(`https://kookr.herokuapp.com/api/schedule`, recipePost)
            .then(res => {

            })
            .catch(err => {
                console.error("Error in addAlltoCalendar: ", err);
            })
    })
    return dispatch => {
        dispatch(addAllToCalendar2())
    }
}