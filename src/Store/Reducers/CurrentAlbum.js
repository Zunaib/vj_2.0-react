import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    currentalbum: null,
    error: null,
    loading: true
}

const CurrentAlbum = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Fetch_Single_Album_Start:
            return {
                ...state,
                loading: true
            };
        case actionTypes.Fetch_Single_Album_Failed:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.Fetch_Single_Album_Success:
            return {
                ...state,
                currentalbum: action.album,
                loading: false,
                error: null

            };
        case actionTypes.Reset:
            return state = initialState;
        default:
            return state;
    }
};

export default CurrentAlbum;