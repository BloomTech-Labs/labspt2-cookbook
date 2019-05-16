import {GET_ALL_SCHEDULE_ITEMS, ADD_CALENDAR_ITEM, DELETE_CALENDAR_ITEM, UPDATE_CALENDAR_ITEM, GET_CALENDAR_ITEM, ADD_CALENDAR_ITEMS} from '../actions/CalendarActions';

const initialState = {
   calendar: [{
        cal_id: 0,
        calendarDate: 'date time',
        tag_id: 1, 
        recipe_id: 1
   },
   {
    cal_id: 0,
    calendarDate: 'date time',
    tag_id: 1, 
    recipe_id: 2
},{
    cal_id: 0,
    calendarDate: 'date time',
    tag_id: 1, 
    recipe_id: 3
}]
}
//ids  1 - 4 breakfast bruch lunch dinner
const CalendarReducer = ((state = initialState, action) => {
    switch (action.type) {

        case GET_CALENDAR_ITEM:

           let i 
        for(i = 0; i <= state.length + 1; i++ ){
            if(action.payload.recipe_id === state.calendar[i].recipe_id) {
                state = [state.calendar[i]]
            }
        } 
        
           return state

        case GET_ALL_SCHEDULE_ITEMS:
      
        
            
            return { state,
                calendar: [{...action.payload}]
            }
           //return [...]
            case ADD_CALENDAR_ITEM:
            state = Object.assign({}, state, {calendar: state.calendar.push(action.payload)})
            return state

        case DELETE_CALENDAR_ITEM:
            return state

        case UPDATE_CALENDAR_ITEM:
            return state;

        case ADD_CALENDAR_ITEMS:
            return state

        default:
            return state;
            
    }
})

export {CalendarReducer}