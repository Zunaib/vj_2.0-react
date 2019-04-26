import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    albumsettings: [],
    loading: true,
    error: null,
    message: null
}

const AlbumSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Update_AlbumMessage_Refresh:
            return {
                ...state,
                message: null,
                loading: false
            };
        case actionTypes.Update_AlbumSettings_Start:
            return {
                ...state,
                loading: true
            };
        case actionTypes.Update_AlbumSettings_Success:
            return {
                ...state,
                loading: false,
                message: action.message
            };
        case actionTypes.Update_AlbumSettings_Failed:
            return {
                ...state,
                loading: false,
                message: action.error,
            };
        case actionTypes.Delete_AlbumSettings_Start:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.Delete_AlbumSettings_Success:
            return {
                ...state,
                message: action.message,
                loading: false,
                error: false
            };
        case actionTypes.Delete_AlbumSettings_Failed:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.Reset:
            return state = initialState;
        default:
            return state;
    }
};

export default AlbumSettingsReducer;