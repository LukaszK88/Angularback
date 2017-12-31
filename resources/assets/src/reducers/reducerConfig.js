import {
  ADD_LOADING,
  SET_CURRENT_MODAL,
  SET_ACTIVE_MENU_ITEM,
  SET_ACTIVE_CHAT,
} from '../actions/types';

const initState = {
  loading: false,
  currentModal: null,
  activeMenuItem: 'ranking',
  activeChat: {
    conversationId:null
  },
};

export default function (state = initState, action) {
  switch (action.type) {
    case SET_ACTIVE_CHAT:
      return { ...state, activeChat: action.payload };
    case SET_ACTIVE_MENU_ITEM:
      return { ...state, activeMenuItem: action.payload };
    case SET_CURRENT_MODAL:
      return { ...state, currentModal: action.payload };
    case ADD_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
