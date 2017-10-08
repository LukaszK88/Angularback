import { FETCH_USER,FETCH_ACHIEVEMENTS, DELETE_ACHIEVEMENT,FETCH_USER_EVENTS } from '../actions/types';
import _ from 'lodash';



export default function (state=null,action) {
    switch (action.type){
        case FETCH_USER_EVENTS:
            return {...state,['events']:action.payload.data};
        case DELETE_ACHIEVEMENT:
            const newState = {...state};

            return {...state,['achievements']:{
                        ...state['achievements'],['data']:{
                            ...state['achievements']['data'],['data']: newState.achievements.data.data.filter(achievement => achievement.id !== action.payload.id)
                    }}};
        case FETCH_ACHIEVEMENTS:
            // return {...state,['achievements']:{
            //             ...state,['data']:{
            //                 ...state,['data']:_.mapKeys(action.payload.data.data.data, 'id' ),
            //                             ['achievement']:action.payload.data.data.achievement
            //     }}};
            return {...state,['achievements']:action.payload.data};
        case FETCH_USER:
            return {...state,['user']:action.payload.data};
        default:
            return state;
    }

    //_.mapKeys(action.payload.data.data, 'id')

}