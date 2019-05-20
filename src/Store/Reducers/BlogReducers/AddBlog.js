import * as actionTypes from '../../Actions/ActionTypes';


const initialState = {
    loading: false,
    error: null,
    message: null,
    blogid: null,
    added: false,
}

const AddBlogReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Add_Blog_Refresh:
            return {
                ...state,
                message: null,
                loading: false,
                added: false,
                blogid: null

            };
        case actionTypes.Add_Blog_Start:
            return {
                ...state,
                loading: true,
                added: false,
                blogid: null
            };
        case actionTypes.Add_Blog_Success:
            return {
                ...state,
                loading: false,
                message: action.message,
                added: true,
                blogid: action.blogid
            };
        case actionTypes.Add_Blog_Failed:
            return {
                ...state,
                loading: false,
                error: action.error,
                added: false,
                blogid: null
            };
        case actionTypes.Reset:
            return state = initialState;
        default:
            return state;
    }
};

export default AddBlogReducer;