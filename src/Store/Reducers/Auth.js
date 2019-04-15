import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    redirect: false
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Auth_Error_Refresh:
            return {
                ...state,
                error: null,
                loading: false
            };
        case actionTypes.Auth_Start:
            return {
                ...state,
                error: null,
                loading: true
            };
        case actionTypes.Auth_Fail:
            return {
                ...state,
                error: action.error,
                loading: false,
                redirect: false
            };
        case actionTypes.Auth_Logout:
            return {
                ...state,
                error: null,
                token: null,
                userId: null,
                loading: false,
                redirect: false
            };
        case actionTypes.Auth_Success:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                error: null,
                loading: false,
                redirect: true
            };
        case actionTypes.Auth_Reset_Redirect:
            return {
                ...state,
                error: null,
                loading: false,
                redirect: false,
                token: null
            };
        default:
            return state;
    }
}

export default AuthReducer;