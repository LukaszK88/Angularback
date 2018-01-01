import { FETCH_MESSAGES, SEND_MESSAGE, FETCH_USERS_FOR_CONVERSATIONS, READ_MESSAGE } from '../actions/types';

const initState = {
  messages: [],
  users: [],
};

export default function (state = initState, action) {
  switch (action.type) {
    case FETCH_USERS_FOR_CONVERSATIONS:
      return { ...state, users: action.payload.data };
    case SEND_MESSAGE:
      return { ...state, messages: state.messages.concat(action.payload) };
    case FETCH_MESSAGES:
      return { ...state, messages: action.payload.data };
    default:
      return state;
  }
}
