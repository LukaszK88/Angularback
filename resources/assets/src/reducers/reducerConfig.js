import {
  ADD_LOADING,
  SET_CURRENT_MODAL,
  SET_ACTIVE_MENU_ITEM,
} from '../actions/types';

const initState = {
  loading: false,
  currentModal: null,
  activeMenuItem: 'ranking',
};

export default function (state = initState, action) {
  switch (action.type) {
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
