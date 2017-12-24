import axios from 'axios';
import { API } from './index';
import {
  FETCH_EVENTS,
  FETCH_EVENT_TYPES,
  DELETE_EVENT,
  ADD_EVENT,
  FETCH_USER_EVENTS,
  FETCH_EVENT,
  FETCH_EVENTS_BY_TYPE,
  FETCH_FUTURE_EVENTS,
} from './types';
import { addFlashMessage } from './flashMessages';


export function fetchFutureEvents() {
  const request = axios.get(`${API}events-future`);

  return {
    type: FETCH_FUTURE_EVENTS,
    payload: request,
  };
}


export function fetchEventsByType(type) {
  const request = axios.get(`${API}events/${type}`);

  return {
    type: FETCH_EVENTS_BY_TYPE,
    payload: request,
  };
}

export function fetchEvents() {
  const request = axios.get(`${API}event`);

  return {
    type: FETCH_EVENTS,
    payload: request,
  };
}

export function fetchEvent(eventId) {
  const request = axios.get(`${API}event/${eventId}`);

  return {
    type: FETCH_EVENT,
    payload: request,
  };
}

export function deleteEvent(event) {
  return axios.delete(`${API}event/${event.id}`).then(response => (dispatch) => {
    dispatch(addFlashMessage('error', response.data.message));
    dispatch({
      type: DELETE_EVENT,
      payload: event,
    });
  });
}

export function notGoingToEvent(eventId, userId) {
  return axios.delete(`${API}event-attend/${eventId}/${userId}`).then(response => (dispatch) => {
    dispatch(addFlashMessage('success', 'You can always change your mind'));
    dispatch(fetchEvent(eventId));
  });
}

export function attendEvent(data, eventId, userId) {
  return axios.post(`${API}event-attend/${eventId}/${userId}`, data).then(response => (dispatch) => {
    dispatch(addFlashMessage('success', 'Better start training...'));
    dispatch(fetchEvent(eventId));
  });
}

export function updateEvent(event) {
  return axios.put(`${API}event/${event.id}`, event).then(response => (dispatch) => {
    dispatch(addFlashMessage('success', 'Event updated'));
    dispatch(fetchEvents());
  });
}

export function addEvent(data) {
  return axios.post(`${API}event`, data).then(response => (dispatch) => {
    dispatch(addFlashMessage('success', 'Event added', 'Remember to add categories'));
    dispatch(fetchEvents());
  });
}

export function getEventTypes() {
  const request = axios.get(`${API}event-types`);

  return {
    type: FETCH_EVENT_TYPES,
    payload: request,
  };
}

export function fetchUserEvents(userClubId) {
  const request = axios.get(`${API}event-user/${userClubId}`);

  return {
    type: FETCH_USER_EVENTS,
    payload: request,
  };
}

export function addEventCategories(categories) {
  return axios.post(`${API}event-categories`, categories).then(response => (dispatch) => {
    dispatch(addFlashMessage('success', 'Categories added'));
    dispatch(fetchEvents());
  });
}
