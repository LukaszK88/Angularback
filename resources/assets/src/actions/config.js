import { ADD_LOADING, SET_CURRENT_MODAL } from './types';

export function loading(set) {
  return {
    type: ADD_LOADING,
    payload: set,
  };
}

export function setCurrentOpenModal(modal) {
  return {
    type: SET_CURRENT_MODAL,
    payload: modal,
  };
}
