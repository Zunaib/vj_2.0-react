import * as actionTypes from '../../Actions/ActionTypes';


const initialState = {
    Vlogs: [],
    loading: false,
    error: false
}

const DashboardVlogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Fetch_Dash_Vlogs_Start:
            return {
                ...state,
                loading: true,
                Vlogs: []
            };
        case actionTypes.Fetch_Dash_Vlogs_Success:
            return {
                ...state,
                Vlogs: state.Vlogs.concat(action.Vlogs),
                loading: false,
                error: false
            };
        case actionTypes.Fetch_Dash_Vlogs_Failed:
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

export default DashboardVlogsReducer;