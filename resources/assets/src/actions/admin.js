import axios from 'axios';
import { API } from './index';
import { FETCH_USERS_ADMIN,FETCH_USERS,DELETE_USER,FETCH_USER_ROLES,UPDATE_USER_ROLE} from './types';
import {addFlashMessage} from './flashMessages';
import {loading} from './config';

export function fetchUsersAdmin() {
    const request = axios.get(`${API}admin`);

    return{
        type:FETCH_USERS_ADMIN,
        payload:request
    }
}

export function getUserRoles() {
    const request = axios.get(`${API}user-roles`);

    return{
        type:FETCH_USER_ROLES,
        payload:request
    }
}

export function updateUserRole(userId, data) {
    return axios.put(`${API}user/${userId}`,data).then((response) => {
        return (dispatch) => {
            dispatch(addFlashMessage('success',response.data.message));
            dispatch(fetchUsers());
            // dispatch({
            //     type:DELETE_USER,
            //     payload:user
            // });
        }
    });
}

export function fetchUsers() {
    const request = axios.get(`${API}user`);

    return{
        type:FETCH_USERS,
        payload:request
    }
}

export function deleteUser(user) {
    return axios.delete(`${API}user/${user.id}`).then((response) => {
        return (dispatch) => {
            dispatch(addFlashMessage('error',response.data.message));
            dispatch({
                type:DELETE_USER,
                payload:user
            });
        }
    });


}

export function takeAdminAction(user, action) {

    return axios.get(`${API}admin/${user.id}/${action}`).then((response) => {
        return (dispatch) => {
            dispatch(addFlashMessage('success',response.data.message));
            dispatch(fetchUsersAdmin());
            dispatch(fetchUsers());
            dispatch(loading(false));
        }
    });
}
