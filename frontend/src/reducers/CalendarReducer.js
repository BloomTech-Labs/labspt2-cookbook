import { ADD_CALENDAR_ITEM, DELETE_CALENDAR_ITEM, UPDATE_CALENDAR_ITEM, GET_CALENDAR_ITEM} from '../actions/CalendarActions';


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
           console.log(action)
           console.log(state)
            state = Object.assign({}, state, {calendar: state.calendar.filter(item => action.payload.recipe_id === item.recipe_id)} )
            console.log(state)
           return state
            
           //return [...]
            case ADD_CALENDAR_ITEM:
            state = Object.assign({}, state, {calendar: state.calendar.push(action.payload)})
            return state

        case DELETE_CALENDAR_ITEM:
            return state

        case UPDATE_CALENDAR_ITEM:
            return state;

        default:
            return state;
            
    }
})

export {CalendarReducer}