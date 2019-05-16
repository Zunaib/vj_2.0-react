import * as actionTypes from '../../Actions/ActionTypes';


const initialState = {
    loading: true,
    error: null,
    updated: null
}

const AlbumUpdateReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Update_AlbumMessage_Refresh:
            return {
                ...state,
                updated: null,
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
                updated: action.message,
                error: null
            };
        case actionTypes.Update_AlbumSettings_Failed:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case actionTypes.Reset:
            return state = initialState;
        default:
            return state;
    }
};

export default AlbumUpdateReducer;