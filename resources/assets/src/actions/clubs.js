import axios from 'axios';
import { API } from './index';
import { FETCH_CLUBS, FETCH_CLUB, FETCH_ALL_CLUBS, REMOVE_FIGHTER_FROM_CLUB, REPLACE_CAPTAIN } from './types';
import { addFlashMessage } from './flashMessages';
import request from 'superagent';
import { loading } from './config';
import { currentLoggedInUser } from './user';
import { mapFighters } from '../services/user';

export function replaceCaptain(userId, captain) {
  return axios.get(`${API}club-captain-replace/${userId}/${captain.id}`).then(response => (dispatch) => {
    dispatch(addFlashMessage('success', response.data.message));
    dispatch(fetchClub(captain.club_id));
    dispatch(currentLoggedInUser(window.localStorage.getItem('token')));
  });
}


export function removeFighterFromClub(userId) {
  return axios.get(`${API}club-fighter-remove/${userId}`).then(response => (dispatch) => {
    dispatch(addFlashMessage('success', response.data.message));
    dispatch({
      type: REMOVE_FIGHTER_FROM_CLUB,
      payload: userId,
    });
  });
}

export function fetchClubs(country = 0, year = 0) {
  const request = axios.get(`${API}clubs/${country}/${year}`);

  return {
    type: FETCH_CLUBS,
    payload: request,
  };
}

export function registerClubFighter(data) {
  return axios.post(`${API}club-fighter`, data).then(response => (dispatch) => {
    dispatch(addFlashMessage('success', response.data.message));
    dispatch(loading(false));
    dispatch(fetchClub(data.club_id));
  }).catch(error => (dispatch) => {
    dispatch(addFlashMessage('error', error.response.data.error));
    dispatch(loading(false));
  });
}

export function takeClubAdminAction(club, action) {
  return axios.post(`${API}club-action/${action}`, club).then(response => (dispatch) => {
    dispatch(fetchAllClubs());
    dispatch(loading(false));
    dispatch(addFlashMessage('success', response.data.message));
  });
}

export function fetchAllClubs() {
  const request = axios.get(`${API}clubs-all`);

  return {
    type: FETCH_ALL_CLUBS,
    payload: request,
  };
}

export function registerClub(data) {
  return axios.post(`${API}clubs`, data).then(response => (dispatch) => {
    dispatch(addFlashMessage('success', response.data.message));
    dispatch(loading(false));
  }).catch(error => (dispatch) => {
    dispatch(addFlashMessage('error', error.response.data.error));
    dispatch(loading(false));
  });
}

export function updateClub(clubId, data) {
  return axios.put(`${API}clubs/${clubId}`, data).then(response => (dispatch) => {
    dispatch(fetchClub(clubId));
    dispatch(addFlashMessage('success', response.data.message));
  });
}

export function uploadClubLogo(clubId, images) {
  return (dispatch) => {
    dispatch(request.post(`${API}club-logo/${clubId}`).attach('file', images[0]).then((response) => {
      dispatch(addFlashMessage('success', response.body.message));
    }));
  };
}

export function fetchClub(clubId) {
  return axios.get(`${API}clubs/${clubId}`).then(response => (dispatch) => {
    const club = {
      ...response.data,
      fighters: mapFighters(response.data.fighters),
    };
    dispatch({
      type: FETCH_CLUB,
      payload: club,
    });
  });
}
