import * as actionTypes from '../../Actions/ActionTypes';


const initialState = {
    loading: true,
    error: null,
    updated: null
}

const UserSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Update_Single_Vlog_Msg:
            return {
                ...state,
                updated: null,
                loading: false
            };
        case actionTypes.Update_Single_Vlog_Start:
            return {
                ...state,
                loading: true,
                updated: null,
            };
        case actionTypes.Update_Single_Vlog_Success:
            return {
                ...state,
                loading: false,
                updated: action.message
            };
        case actionTypes.Update_Single_Vlog_Failed:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case actionTypes.Reset:
            return state = initialState;
        default:
            return state;
    }
};

export default UserSettingsReducer;