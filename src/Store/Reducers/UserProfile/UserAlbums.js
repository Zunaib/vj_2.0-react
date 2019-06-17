import * as actionTypes from '../../Actions/ActionTypes';

const initialState = {
    profilealbums: [],
    loading: false,
    error: false
}

const UserAlbumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Fetch_UserProfile_Album_Start:
            return {
                ...state,
                loading: true,
                profilealbums: []
            };
        case actionTypes.Fetch_UserProfile_Album_Success:
            return {
                ...state,
                profilealbums: state.profilealbums.concat(action.profilealbums),
                loading: false,
                error: false
            };
        case actionTypes.Fetch_UserProfile_Album_Failed:
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

export default UserAlbumsReducer;