import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    loading: false,
    error: null,
    message: null
}

const AlbumReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Add_Message_Refresh:
            return {
                ...state,
                message: null,
                loading: false
            };
        case actionTypes.Add_Album_Start:
            return {
                ...state,
                loading: true
            };
        case actionTypes.Add_Album_Success:
            return {
                ...state,
                loading: false,
                message: action.message
            };
        case actionTypes.Add_Album_Failed:
            return {
                ...state,
                loading: false,
                message: action.error,
            };
        case actionTypes.Reset:
            return state = initialState;
        default:
            return state;
    }
};

export default AlbumReducer;