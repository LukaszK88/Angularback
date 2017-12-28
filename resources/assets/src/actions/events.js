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
  FETCH_USER_HOSTED_EVENTS,
  UPDATE_EVENT,
  FETCH_EVENTS_ACHIEVEMENTS,
} from './types';
import { addFlashMessage } from './flashMessages';
import _ from 'lodash';
import { mapAttendance } from "../services/events/index";

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
  return axios.get(`${API}event/${eventId}`).then(response => (dispatch) => {

    const event = {
      ...response.data,
      id:response.data.id,
      attendance: mapAttendance(response.data.attendance),
      body:response.data.body,
      club_id:response.data.club_id,
      event_type:response.data.event_type,
      event_type_id:response.data.event_type_id,
      lat:response.data.lat,
      lng:response.data.lng,
      user:response.data.user,
      user_id:response.data.user_id,
    }

    dispatch({
      type: FETCH_EVENT,
      payload: event,
    });
  });
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
    dispatch(fetchUserHostedEvents(event.user_id));
    dispatch({
      type: UPDATE_EVENT,
      payload: event,
    });
  });
}

export function addEvent(data) {
  return axios.post(`${API}event`, data).then(response => (dispatch) => {
    dispatch(addFlashMessage('success', 'Event added'));
    dispatch(fetchFutureEvents());
  });
}

export function fetchUserHostedEvents(userId, future) {
  const request = axios.get(`${API}events-host/${userId}/${future}`);

  return {
    type: FETCH_USER_HOSTED_EVENTS,
    payload: request,
  };
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
    dispatch(fetchUserHostedEvents(categories.user_id, true));
  });
}

export function fetchEventsAchievements() {
  const request = axios.get(`${API}events-achievements`);

  return {
    type: FETCH_EVENTS_ACHIEVEMENTS,
    payload: request,
  };
}
