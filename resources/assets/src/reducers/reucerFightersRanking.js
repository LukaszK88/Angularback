import {
  FETCH_FIGHTERS,
  ACTIVE_CATEGORY,
  ACTIVE_SEASON,
} from '../actions/types';

const initState = {
  season: (new Date()).getFullYear(),
  category: 'Total',
}

export default function (state = initState, action) {
  switch (action.type) {
    case ACTIVE_SEASON:
      return { ...state, season: action.payload };
    case ACTIVE_CATEGORY:
      return { ...state, category: action.payload };
    case FETCH_FIGHTERS:
      return { ...state, fighters: action.payload.data };
    default:
      return state;
  }
}
