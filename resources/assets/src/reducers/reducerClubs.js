import { FETCH_CLUBS } from '../actions/types';


export default function (state=null,action) {
    switch (action.type){
        case FETCH_CLUBS:
            return action.payload.data;

        default:
            return state;
    }

}