import { ADD_LOADING } from '../actions/types';
import _ from 'lodash';

const initState = {
    loading: false
};

export default function (state=initState,action) {
    switch (action.type){
        case ADD_LOADING:
            return {...state,['loading']:action.payload};
        default:
            return state;
    }

}