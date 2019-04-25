import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    settings: [],
    loading: true,
    error: null,
    message: null
}

const NavContentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Fetch_NavSetting_Start:
            return {
                ...state,
                loading: true,
                settings: []
            };
        case actionTypes.Fetch_NavSetting_Success:
            return {
                ...state,
                settings: state.settings.concat(action.UserSettings),
                loading: false,
                error: false
            };
        case actionTypes.Fetch_NavSetting_Failed:
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

export default NavContentReducer;