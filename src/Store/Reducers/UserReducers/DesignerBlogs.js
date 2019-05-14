import * as actionTypes from '../../Actions/ActionTypes';

const initialState = {
    profileblogs: [],
    loading: false,
    error: false,
}

const DesignerBlogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Fetch_DesignerProfile_Blog_Start:
            return {
                ...state,
                loading: true,
                profileblogs: []
            };
        case actionTypes.Fetch_DesignerProfile_Blog_Success:
            return {
                ...state,
                profileblogs: state.profileblogs.concat(action.profileblogs),
                loading: false,
                error: false
            };
        case actionTypes.Fetch_DesignerProfile_Blog_Failed:
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

export default DesignerBlogsReducer;