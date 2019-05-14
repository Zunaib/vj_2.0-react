import * as actionTypes from '../../Actions/ActionTypes';


const initialState = {
    loading: false,
    error: null,
    message: null
}

const AddBlogReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Add_Blog_Refresh:
            return {
                ...state,
                message: null,
                loading: false
            };
        case actionTypes.Add_Blog_Start:
            return {
                ...state,
                loading: true
            };
        case actionTypes.Add_Blog_Success:
            return {
                ...state,
                loading: false,
                message: action.message
            };
        case actionTypes.Add_Blog_Failed:
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

export default AddBlogReducer;