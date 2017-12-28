import {
  FETCH_EVENTS,
  FETCH_EVENT_TYPES,
  DELETE_EVENT,
  FETCH_EVENT,
  FETCH_EVENTS_BY_TYPE,
  FETCH_FUTURE_EVENTS,
  FETCH_USER_HOSTED_EVENTS,
  UPDATE_EVENT,
  FETCH_EVENTS_ACHIEVEMENTS,
} from '../actions/types';

const initialState = {
  eventTypes: {},
  events: {},
  event: null,
  eventsList: null,
  eventsFuture: null,
  eventsHosted: [],
  eventsAchievements: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_EVENTS_ACHIEVEMENTS:
      return { ...state, eventsAchievements: action.payload.data };
    case FETCH_USER_HOSTED_EVENTS:
      return { ...state, eventsHosted: action.payload.data };
    case FETCH_FUTURE_EVENTS:
      return { ...state, eventsFuture: action.payload.data };
    case FETCH_EVENTS_BY_TYPE:
      return { ...state, eventsList: action.payload.data };
    case FETCH_EVENT:
      return { ...state, event: action.payload };
    case DELETE_EVENT:
      return { ...state, eventsHosted: { ...state }.eventsHosted.filter(event => event.id !== action.payload.id) };
    case FETCH_EVENT_TYPES:
      return { ...state, eventTypes: action.payload.data };
    case FETCH_EVENTS:
      return { ...state, events: action.payload.data };
    default:
      return state;
  }
}
