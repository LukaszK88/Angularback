import { FETCH_CLUB, FETCH_CLUB_FIGHTERS, REMOVE_FIGHTER_FROM_CLUB, REPLACE_CAPTAIN } from '../actions/types';

const initState = {
  club: {},
  fighters: {},
};

export default function (state = initState, action) {
  switch (action.type) {
    // case REPLACE_CAPTAIN:
    //   return {
    //     ...state,
    //     club: {
    //       ...state.club,
    //       fighters: state.club.fighters.map(fighter => (fighter.id === action.payload.userId ?
    //         { ...fighter, club_admin_id: state.club.id } :
    //         fighter)),
    //     },
    //   };
    case REMOVE_FIGHTER_FROM_CLUB:
      return {
        ...state,
        club: {
          ...state.club,
          fighters: state.club.fighters.filter(fighter => fighter.id !== action.payload),
        },
      };
    case FETCH_CLUB_FIGHTERS:
      return { ...state, fighters: action.payload.data };
    case FETCH_CLUB:
      return { ...state, club: action.payload.data };
    default:
      return state;
  }
}
