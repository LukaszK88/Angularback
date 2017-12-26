import { ADD_LOADING, SET_CURRENT_MODAL, SET_ACTIVE_MENU_ITEM } from './types';

export function setActiveMenuItem(menuItem) {
  return {
    type: SET_ACTIVE_MENU_ITEM,
    payload: menuItem,
  };
}

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
