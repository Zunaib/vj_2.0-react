import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    currentalbum: null,
    currentalbumproducts: null,
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
        case actionTypes.Fetch_Single_AlbumProduct_Start:
            return {
                ...state,
                loading: true
            };
        case actionTypes.Fetch_Single_AlbumProduct_Failed:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.Fetch_Single_AlbumProduct_Success:
            return {
                ...state,
                currentalbumproducts: action.albumproducts,
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