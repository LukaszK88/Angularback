import axios from 'axios';
import { API } from './index';
import { FETCH_EVENTS, FETCH_EVENT_TYPES,DELETE_EVENT,ADD_EVENT } from './types';
import {addFlashMessage} from './flashMessages';

export function fetchEvents() {
    const request = axios.get(`${API}event`);

    return {
        type:FETCH_EVENTS,
        payload:request
    }
}

export function deleteEvent(event) {
    return axios.delete(`${API}event/${event.id}`).then((response) => {
        return (dispatch) => {
            dispatch(addFlashMessage('error',response.data.message));
            dispatch({
                type:DELETE_EVENT,
                payload:event
            });

        }
    });
}

export function updateEvent(event) {
    return axios.put(`${API}event/${event.id}`,event).then((response) => {
        return (dispatch) => {
            dispatch(addFlashMessage('success','Event updated'));
            dispatch(fetchEvents());
        }
    });
}

export function addEvent(data) {
    return axios.post(`${API}event`,data).then((response) => {
        return (dispatch) => {
            dispatch(addFlashMessage('success','Event added','Remember to add categories'));
            dispatch(fetchEvents());
        }
    });
}

export function getEventTypes() {
    const request = axios.get(`${API}event-types`);

    return {
        type:FETCH_EVENT_TYPES,
        payload:request
    }
}

export function addEventCategories(categories) {
    return axios.post(`${API}event-categories`,categories).then((response) => {
        return (dispatch) => {
            dispatch(addFlashMessage('success','Categories added'));
            dispatch(fetchEvents());
        }
    });
}