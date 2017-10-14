import axios from 'axios';
import {API} from './index';
import {addFlashMessage} from './flashMessages';
import {FETCH_ACHIEVEMENTS, FETCH_FIGHTERS, FETCH_LEADERBOARD, ADD_ACHIEVEMENT, DELETE_ACHIEVEMENT} from './types';

export function addAchievement(achievement) {
    return axios.post(`${API}achievement`,achievement).then((response) => {
        return (dispatch) => {
            dispatch(fetchAchievements(achievement.user_id));
            dispatch(addFlashMessage('success',response.data.message));
        }
    });

}

export function updateAchievement(data, achievementId) {
    return axios.put(`${API}achievement/${achievementId}`,data).then((response) => {
        return (dispatch) => {
            dispatch(fetchAchievements(data.user_id));
            dispatch(addFlashMessage('success',response.data.message));
        }
    });

}

export function deleteAchievement(achievement) {
     return axios.delete(`${API}achievement/${achievement.id}`).then((response) => {
         return (dispatch) => {
             dispatch(addFlashMessage('error',response.data.message));
             dispatch({
                 type:DELETE_ACHIEVEMENT,
                 payload:achievement
             });

         }
     });
}

export function updateRanking(data,type,recordId,fighterId) {
    return axios.post(`${API}fighters-update/${type}/${recordId}/${fighterId}`,data).then((response) => {
        return (dispatch) => {
            dispatch(addFlashMessage('success',response.data.message));
            dispatch(fetchFighters());
        }
    });
}

export function storeRanking(data,type) {
    return axios.post(`${API}fighters/${type}`,data).then((response) => {
        return (dispatch) => {
            dispatch(addFlashMessage('success',response.data.message));
            dispatch(fetchFighters());
        }
    });
}

export function fetchAchievements(userId) {
    const request = axios.get(`${API}achievement/${userId}`);

    return {
        type:FETCH_ACHIEVEMENTS,
        payload:request
    }
}

export function fetchFighters(clubId = 0, date = 0, currentPage = 1) {
    const request = axios.get(`${API}fighters/${clubId}/${date}?page=${currentPage}`);

    return {
        type:FETCH_FIGHTERS,
        payload:request
    }
}

export function fetchFightersByPage(page) {
    const request = axios.get(page);

    return {
        type:FETCH_FIGHTERS,
        payload:request
    }
}

export function fetchLeaderboard() {
    const request = axios.get(`${API}fighters-leaderboard`);

    return {
        type:FETCH_LEADERBOARD,
        payload:request
    }
}
