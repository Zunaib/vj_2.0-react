import * as actionTypes from '../../Actions/ActionTypes';

const initialState = {
    loading: false,
    error: null,
    albumid: null,
    added:false
}

const AlbumReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Add_AlbumMessage_Refresh:
            return {
                ...state,
                albumid: null,
                loading: false,
                added:false
            };
        case actionTypes.Add_Album_Start:
            return {
                ...state,
                loading: true,
                added:false
            };
        case actionTypes.Add_Album_Success:
            return {
                ...state,
                loading: false,
                albumid: action.albumid,
                added:true
            };
        case actionTypes.Add_Album_Failed:
            return {
                ...state,
                loading: false,
                error: action.error,
                added:false
            };
        case actionTypes.Reset:
            return state = initialState;
        default:
            return state;
    }
};

export default AlbumReducer;