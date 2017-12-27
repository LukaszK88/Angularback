import axios from 'axios';
import { API } from './index';
import { FETCH_FEED } from './types';

export function fetchFeed() {
  const request = axios.get(`${API}feed`);

  return {
    type: FETCH_FEED,
    payload: request,
  };
}