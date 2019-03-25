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

    dispatch({
        type: GET_CALENDAR_ITEM,
        payload: {calendaritem, recipe_id: calendaritem.recipe_id }
    })

}