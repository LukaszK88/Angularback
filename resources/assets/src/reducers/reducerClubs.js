import { FETCH_CLUBS,FETCH_ALL_CLUBS } from '../actions/types';

const initState = {
    clubs:{},
    admin:{}
}

export default function (state=initState,action) {
    switch (action.type){
        case FETCH_ALL_CLUBS:
            return {...state,['admin']:action.payload.data};
        case FETCH_CLUBS:
            return {...state,['clubs']:action.payload.data};
        default:
            return state;
    }

}