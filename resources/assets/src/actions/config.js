import {ADD_LOADING} from './types';

export function loading(set) {

    return {
        type:ADD_LOADING,
        payload:set
    }
}

// export function removeFlashMessage() {
//
//     return {
//         type:REMOVE_FLASH_MESSAGE
//     }
// }