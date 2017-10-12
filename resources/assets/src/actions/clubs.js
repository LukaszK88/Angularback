import axios from 'axios';
import { API } from './index';
import { FETCH_CLUBS,FETCH_CLUB,FETCH_ALL_CLUBS } from './types';
import {addFlashMessage} from './flashMessages';
import request from 'superagent';
import {loading} from './config';

export function fetchClubs() {
    const request = axios.get(`${API}clubs`);

    return {
        type:FETCH_CLUBS,
        payload:request
    }
}

export function takeClubAdminAction(club,action) {
    return axios.post(`${API}club-action/${action}`,club).then((response) => {
        return (dispatch) => {
            dispatch(fetchAllClubs());
            dispatch(loading(false));
            dispatch(addFlashMessage('success',response.data.message));

        }
    });
}

export function fetchAllClubs() {
    const request = axios.get(`${API}clubs-all`);

    return {
        type:FETCH_ALL_CLUBS,
        payload:request
    }
}

export function registerClub(data) {
    return axios.post(`${API}clubs`,data).then((response) => {
        return (dispatch) => {
            dispatch(addFlashMessage('success',response.data.message));
            dispatch(loading(false));
        }
    });
}

export function updateClub(clubId,data) {
    return axios.put(`${API}clubs/${clubId}`,data).then((response) => {
        return (dispatch) => {
            dispatch(fetchClub(clubId));
            dispatch(addFlashMessage('success',response.data.message));
        }
    });
}

export function uploadClubLogo(clubId,images) {
    return (dispatch) => { dispatch( request.post(`${API}club-logo/${clubId}`).attach('file',images[0]).then((response) =>{
        dispatch(addFlashMessage('success',response.body.message));
    }))};
}

export function fetchClub(clubId) {
    const request = axios.get(`${API}clubs/${clubId}`);

    return {
        type:FETCH_CLUB,
        payload:request
    }
}