import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { FETCH_USER, UPDATE_USER } from './types';
import { addFlashMessage } from './flashMessages';
import request from 'superagent';
import { config } from '../config';
import { loading } from './config';

export const CURRENT_USER = 'CURRENT_USER';
export const API = config.API.base;

export function logout() {
  return (dispatch) => {
    window.localStorage.removeItem('token');
    setAuthorizationToken(false);
    dispatch(currentLoggedInUser(null));
    dispatch(addFlashMessage('error', 'Logging out...'));
  };
}

export function updatePassword(data) {
  return axios.put(`${API}user-updatePassword`, data).then(response => (dispatch) => {
    dispatch(addFlashMessage('success', response.data.message));
  }).catch(error => (dispatch) => {
    dispatch(addFlashMessage('error', error.response.data.error));
  });
}

export function recoverPassword(data) {
  return axios.post(`${API}user-recover`, data).then(response => (dispatch) => {
    dispatch(addFlashMessage('success', response.data.message));
  }).catch(error => (dispatch) => {
    dispatch(addFlashMessage('error', error.response.data.error));
  });
}

export function updateUser(data) {
  return axios.put(`${API}user-update`, data).then(response => (dispatch) => {
    dispatch(addFlashMessage('success', response.data.message));
    dispatch({
      type: UPDATE_USER,
      payload: response.data.data,
    });
  });
}

export function fetchUser(userId) {
  return axios.get(`${API}fighter/${userId}`).then((response) => {
    return (dispatch) => {
      // dispatch(addFlashMessage('success', response.data.message));
      dispatch({
        type: FETCH_USER,
        payload: response,
      });
    };
  });
}

export function uploadProfileImage(userId, images) {
  return (dispatch) => {
    dispatch(request.post(`${API}storePhoto/${userId}`).attach('file', images[0]).then((response) => {
      dispatch(addFlashMessage('success', response.body.message));
    }));
  };
}

export function checkUsername(user, callback) {
  return axios.post(`${API}user/authenticate`, user).then((response) => {
    callback(response);
    return (dispatch) => {
      dispatch(loading(false));
    };
  }).catch(error => (dispatch) => {
    dispatch(addFlashMessage('error', error.response.data.error));
    dispatch(loading(false));
  });
}

export function loginUser(user, createPassword) {
  return axios.post(`${API}user/authenticatePassword/${createPassword}`, user).then((response) => {
    const { token, message } = response.data;
    window.localStorage.setItem('token', token);
    setAuthorizationToken(token);
    return (dispatch) => {
      dispatch(currentLoggedInUser(token));
      dispatch(addFlashMessage('success', message));
      dispatch(loading(false));
    };
  }).catch(error => (dispatch) => {
    dispatch(addFlashMessage('error', error.response.data.error));
    dispatch(loading(false));
  });
}

export function registerUser(data) {
  return axios.post(`${API}user-store`, data).then(response => (dispatch) => {
    dispatch(addFlashMessage('success', response.data.message));
    dispatch(loading(false));
  }).catch(error => (dispatch) => {
    dispatch(addFlashMessage('error', error.response.data.error));
    dispatch(loading(false));
  });
}

export function loginWithFacebook(data) {
  return axios.post(`${API}login-facebook`, data).then((response) => {
    const { token, message } = response.data;
    window.localStorage.setItem('token', token);
    setAuthorizationToken(token);

    return (dispatch) => {
      dispatch(currentLoggedInUser(token));
      dispatch(addFlashMessage('success', message));
    };
  }).catch(error => (dispatch) => {
    dispatch(addFlashMessage('error', error.response.data.error));
    dispatch(loading(false));
  });
}

export function currentLoggedInUser(token) {
  const request = axios.get(`${API}user-current`, { Authorization: `Bearer ${token}` });

  return {
    type: CURRENT_USER,
    payload: request,
  };
}
