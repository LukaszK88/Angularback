import { FETCH_LEADERBOARD } from '../actions/types';


export default function (state = null, action) {
  switch (action.type) {
    case FETCH_LEADERBOARD:
      return action.payload.data;

    default:
      return state;
  }
}
