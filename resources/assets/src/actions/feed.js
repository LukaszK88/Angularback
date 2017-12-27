import axios from 'axios';
import { API } from './index';
import { FETCH_FEED } from './types';

export function fetchFeed(feedOffset) {
  const request = axios.get(`${API}feed/${feedOffset}`);

  return {
    type: FETCH_FEED,
    payload: request,
  };
}