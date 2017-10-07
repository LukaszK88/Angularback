import axios from 'axios';
import { API } from './index';
import { FETCH_CLUBS } from './types';

export function fetchClubs() {
    const request = axios.get(`${API}club`);

    return {
        type:FETCH_CLUBS,
        payload:request
    }
}