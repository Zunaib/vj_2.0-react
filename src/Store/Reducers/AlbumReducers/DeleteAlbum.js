import * as actionTypes from '../../Actions/ActionTypes';


const initialState = {
    loading: true,
    error: null,
    deleted: null
}

const DeleteAlbumReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Delete_AlbumSettings_Msg:
            return {
                ...state,
                loading: false,
                deleted: null
            };
        case actionTypes.Delete_AlbumSettings_Start:
            return {
                ...state,
                loading: true,
                deleted: null
            };
        case actionTypes.Delete_AlbumSettings_Success:
            return {
                ...state,
                deleted: action.message,
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

export default DeleteAlbumReducer;