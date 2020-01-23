import * as actionTypes from '../../Actions/ActionTypes';


const initialState = {
    loading: true,
    error: null,
    updated: null
}

const UpdateBlogReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Update_BlogMessage_Refresh:
            return {
                ...state,
                message: null,
                loading: false,
                updated:null
            };
        case actionTypes.Update_Single_Blog_Start:
            return {
                ...state,
                loading: true,
                updated:null
            };
        case actionTypes.Update_Single_Blog_Success:
            return {
                ...state,
                loading: false,
                updated: action.message
            };
        case actionTypes.Update_Single_Blog_Failed:
            return {
                ...state,
                loading: false,
                updated: action.error,
            };
        case actionTypes.Reset:
            return state = initialState;
        default:
            return state;
    }
};

export default UpdateBlogReducer;