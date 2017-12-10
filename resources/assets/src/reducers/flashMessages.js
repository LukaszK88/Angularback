import { ADD_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE } from '../actions/types';
import _ from 'lodash';

export default function (state = null, action) {
  switch (action.type) {
    case REMOVE_FLASH_MESSAGE:
      return null;
    case ADD_FLASH_MESSAGE:
      // todo better solution for arrays
      if (action.payload.text.hasOwnProperty('email')) {
        const errorBag = [];
        _.forEach(action.payload.text.email, (error) => {
          errorBag.push(error);
        });
        return {
          ...state,
          type: action.payload.type,
          text: errorBag.join('<br/>'),
        };
      }

      return {
        ...state,
        type: action.payload.type,
        text: action.payload.text,
        sub: action.payload.sub,
      };

    default:
      return state;
  }
}
