import * as actionTypes from '../../Actions/ActionTypes';


const initialState = {
    currentvlog: null,
    error: null,
    loading: true
}

const CurrentVlog = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Fetch_Single_Vlog_Start:
            return {
                ...state,
                loading: true
            };
        case actionTypes.Fetch_Single_Vlog_Failed:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.Fetch_Single_Vlog_Success:
            return {
                ...state,
                currentvlog: action.vlog,
                loading: false,
                error: null

            };
        case actionTypes.Reset:
            return state = initialState;
        default:
            return state;
    }
};

export default CurrentVlog;