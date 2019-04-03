export const ADD_CALENDAR_ITEM = "ADD_CALENDAR_ITEM"
export const DELETE_CALENDAR_ITEM = "DELETE_CALENDAR_ITEM"
export const UPDATE_CALENDAR_ITEM = "UPDATE_CALENDAR_ITEM"
export const GET_CALENDAR_ITEM = "GET_CALENDAR_ITEM"








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

export const getCalendarItem = (calendaritem) => (dispatch) => {
    
//    axios.get('url for get request', `${recipe_id}`).then((res) => {
        //do something with res
        // return res
//    }).then(ModifiedItem => {

        // dispatch({
        //     type: GET_CALENDAR_ITEM,
        //     payload: {calendaritem, recipe_id: calendaritem.recipe_id }
        // })

//    }) 

//might make requesting typ and dispatching type different to account
//for a loading icon depenging on how much time
    dispatch({
        type: GET_CALENDAR_ITEM,
        payload: {calendaritem, recipe_id: calendaritem.recipe_id }
    })

}