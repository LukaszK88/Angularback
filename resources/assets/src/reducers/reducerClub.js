import { FETCH_CLUB, FETCH_CLUB_FIGHTERS } from '../actions/types';

const initState = {
  club: {},
  fighters: {},
};

export default function (state = initState, action) {
  switch (action.type) {
    case FETCH_CLUB_FIGHTERS:
      return { ...state, fighters: action.payload.data };
    case FETCH_CLUB:
      return { ...state, club: action.payload.data };
    default:
      return state;
  }
}
