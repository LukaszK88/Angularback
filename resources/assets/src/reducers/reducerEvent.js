import {
  FETCH_EVENTS,
  FETCH_EVENT_TYPES,
  DELETE_EVENT,
  FETCH_EVENT,
  FETCH_EVENTS_BY_TYPE,
  FETCH_FUTURE_EVENTS,
  FETCH_USER_HOSTED_EVENTS,
} from '../actions/types';

const initialState = {
  eventTypes: {},
  events: {},
  event: null,
  eventsList: null,
  eventsFuture: null,
  eventsHosted: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_HOSTED_EVENTS:
      return { ...state, eventsHosted: action.payload.data };
    case FETCH_FUTURE_EVENTS:
      return { ...state, eventsFuture: action.payload.data };
    case FETCH_EVENTS_BY_TYPE:
      return { ...state, eventsList: action.payload.data };
    case FETCH_EVENT:
      return { ...state, event: action.payload.data };
    case DELETE_EVENT:
      return { ...state, events: { ...state }.events.filter(event => event.id !== action.payload.id) };
    case FETCH_EVENT_TYPES:
      return { ...state, eventTypes: action.payload.data };
    case FETCH_EVENTS:
      return { ...state, events: action.payload.data };
    default:
      return state;
  }
}
