import axios from 'axios';
import { API } from './index';
import { FETCH_MESSAGES, SEND_MESSAGE, FETCH_USERS_FOR_CONVERSATIONS } from './types';
import { addFlashMessage } from './flashMessages';

export function sendMessage(data) {
  return axios.post(`${API}messages`,data).then(response => (dispatch) => {
    // const messages = {
    //   ...response,
    // };

    dispatch({
      type: SEND_MESSAGE,
      payload: data,
    });
  });
}

export function fetchMessages(userId) {
  return axios.get(`${API}messages/${userId}`).then(response => (dispatch) => {
    const messages = {
      ...response,
    };

    dispatch({
      type: FETCH_MESSAGES,
      payload: messages,
    });
  });
}

export function startConversationWithUser(toUserId,fromUserId,callback) {
  return axios.get(`${API}conversation-users-start/${toUserId}/${fromUserId}`).then(response => (dispatch) => {
    callback(response);
  });
}

export function fetchUsersForConversation(conversations) {
  return axios.post(`${API}conversations-users`, conversations).then(response => (dispatch) => {
    const users = {
      ...response,
    };

    dispatch({
      type: FETCH_USERS_FOR_CONVERSATIONS,
      payload: users,
    });
  });
}