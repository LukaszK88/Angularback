import { ADD_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE } from './types';

export function addFlashMessage(type, text, subText = null) {
  return {
    type: ADD_FLASH_MESSAGE,
    payload: {
      type,
      text,
      sub: subText,
    },
  };
}

export function removeFlashMessage() {
  return {
    type: REMOVE_FLASH_MESSAGE,
  };
}
