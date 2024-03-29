import * as actionTypes from '../../Actions/ActionTypes';

const initialState = {
    profilevlogs: [],
    loading: false,
    error: false,
}

const UserVlogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Fetch_UserProfile_Vlog_Start:
            return {
                ...state,
                loading: true,
                profilevlogs: []
            };
        case actionTypes.Fetch_UserProfile_Vlog_Success:
            return {
                ...state,
                profilevlogs: state.profilevlogs.concat(action.profilevlogs),
                loading: false,
                error: false
            };
        case actionTypes.Fetch_UserProfile_Vlog_Failed:
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

export default UserVlogsReducer;