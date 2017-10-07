import { FETCH_USERS_ADMIN,FETCH_USERS,DELETE_USER,FETCH_USER_ROLES } from '../actions/types';

const initialState = {
    unauthorised:{},
    blocked:{},
    users:{},
    roles:{}
};

export default function (state=initialState,action) {

    switch (action.type){
        case FETCH_USER_ROLES:
            return {...state,['roles']:action.payload.data};
        case DELETE_USER:
            return{...state,['users']:{...state}.users.filter(user => user.id !== action.payload.id)};
        case FETCH_USERS:
            return {...state,['users']:action.payload.data};
        case FETCH_USERS_ADMIN:
            return {...state,['unauthorised']:action.payload.data.unauthorised,
                                ['blocked']:action.payload.data.blocked
            };
        default:
            return state;
    }

}