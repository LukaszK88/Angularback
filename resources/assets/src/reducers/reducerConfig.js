import { ADD_LOADING, SET_CURRENT_MODAL } from '../actions/types';
import _ from 'lodash';

const initState = {
  loading: false,
  currentModal: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case SET_CURRENT_MODAL:
      return { ...state, currentModal: action.payload };
    case ADD_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
