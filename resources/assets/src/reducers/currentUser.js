import { CURRENT_USER } from '../actions';
import { UPDATE_USER } from '../actions/types';

const initialState = {
  isLoggedIn: false,
  admin: false,
  clubAdmin: null,
  editor: false,
  user: {
    club_id: null,
  },
};


export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state, user: action.payload,
      };
    case CURRENT_USER:
      if (!action.payload) {
        window.localStorage.removeItem('token');
        return initialState;
      } else if (action.payload) {
        // admin
        if (action.payload.user_role_id == '3') {
          // admin + club admin
          if (action.payload.user_role_id == '3' && action.payload.club_admin_id) {
            return {
              isLoggedIn: true,
              admin: true,
              editor: true,
              clubAdmin: parseInt(action.payload.club_admin_id),
              user: action.payload,
            };
          }
          return {
            isLoggedIn: true,
            admin: true,
            editor: true,
            clubAdmin: null,
            user: action.payload,
          };
        }
        // club admin
        if (action.payload.club_admin_id != '0') {
          return {
            isLoggedIn: true,
            admin: false,
            editor: true,
            clubAdmin: parseInt(action.payload.club_admin_id),
            user: action.payload,
          };
        }
        // editor
        if (action.payload.user_role_id == '2') {
          return {
            isLoggedIn: true,
            admin: false,
            editor: true,
            clubAdmin: null,
            user: action.payload,
          };
        }
        // normal user
        return {
          isLoggedIn: true,
          admin: false,
          clubAdmin: null,
          user: action.payload,
        };
      }

      return state;

    default:
      return state;
  }
}
