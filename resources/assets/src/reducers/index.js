import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import FighterReducer from './reucerFightersRanking';
import LeaderboardReducer from './reducerLeaderboard';
import CurrentUserReducer from './currentUser';
import EventsReducer from './events/reducerEvent';
import UserReducer from './reducerUserProfile';
import FlashMessage from './flashMessages';
import ClubsReducer from './reducerClubs';
import AdminReducer from './admin';
import ConfigReducer from './reducerConfig';
import ClubReducer from './reducerClub';

const rootReducer = combineReducers({
    fighters:FighterReducer,
    leaderboard:LeaderboardReducer,
    currentUser: CurrentUserReducer,
    events: EventsReducer,
    clubs: ClubsReducer,
    profile:UserReducer,
    flashMessage:FlashMessage,
    admin:AdminReducer,
    config:ConfigReducer,
    club:ClubReducer,
    form: formReducer
});

export default rootReducer;
