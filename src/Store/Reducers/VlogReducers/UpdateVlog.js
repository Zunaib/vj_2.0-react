import * as actionTypes from '../../Actions/ActionTypes';


const initialState = {
    vlog: null,
    loading: true,
    error: null,
    message: null
}

const UserSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        // case actionTypes.Update_Message_Refresh:
        //     return {
        //         ...state,
        //         message: null,
        //         loading: false
        //     };
        case actionTypes.Update_Single_Vlog_Start:
            return {
                ...state,
                loading: true
            };
        case actionTypes.Update_Single_Vlog_Success:
            return {
                ...state,
                loading: false,
                message: action.message
            };
        case actionTypes.Update_Single_Vlog_Failed:
            return {
                ...state,
                loading: false,
                message: action.error,
            };
        case actionTypes.Fetch_Single_Vlog_Start:
            return {
                ...state,
                loading: true,
                vlog: null
            };
        case actionTypes.Fetch_Single_Vlog_Success:
            return {
                ...state,
                vlog: action.vlog,
                loading: false,
                error: false
            };
        case actionTypes.Fetch_Single_Vlog_Failed:
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