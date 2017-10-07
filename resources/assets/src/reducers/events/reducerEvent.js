import { FETCH_EVENTS,FETCH_EVENT_TYPES,DELETE_EVENT,ADD_EVENT } from '../../actions/types';

const initialState = {
    eventTypes:{},
    events:{}
};

export default function (state=initialState,action) {

    switch (action.type){

        case DELETE_EVENT:
            return {...state,['events']:{...state}.events.filter(event => event.id !== action.payload.id)};
        case FETCH_EVENT_TYPES:
            return {...state,['eventTypes']:action.payload.data};
        case FETCH_EVENTS:
            return {...state,['events']:action.payload.data};
        default:
            return state;
    }

}