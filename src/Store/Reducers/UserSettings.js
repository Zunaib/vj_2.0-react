import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    settings: [],
    loading: false,
    error: null,
    message: null
}

const UserSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Update_Message_Refresh:
            return {
                ...state,
                message: null,
                loading: false
            };
        case actionTypes.Update_UserSettings_Start:
            return {
                ...state,
                loading: true
            };
        case actionTypes.Update_UserSettings_Success:
            return {
                ...state,
                loading: false,
                message: action.message
            };
        case actionTypes.Update_UserSettings_Failed:
            return {
                ...state,
                loading: false,
                message: action.error,
            };
        case actionTypes.Fetch_UserSettings_Start:
            return {
                ...state,
                loading: true,
                settings: []
            };
        case actionTypes.Fetch_UserSettings_Success:
            return {
                ...state,
                settings: state.settings.concat(action.UserSettings),
                loading: false,
                error: false
            };
        case actionTypes.Fetch_UserSettings_Failed:
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

export default UserSettingsReducer;