import { FETCH_FEED } from '../actions/types';

const initState = {
  feed: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case FETCH_FEED:
      return { ...state, feed: action.payload.data };
    default:
      return state;
  }
}
