import * as actionTypes from '../../Actions/ActionTypes';


const initialState = {
    currentblog: null,
    error: null,
    loading: true
}

const CurrentBlog = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Fetch_Single_Blog_Start:
            return {
                ...state,
                loading: true,
                currentblog: null
            };
        case actionTypes.Fetch_Single_Blog_Failed:
            return {
                ...state,
                loading: false,
                currentblog: null,
                error: action.error
            };
        case actionTypes.Fetch_Single_Blog_Success:
            return {
                ...state,
                currentblog: action.blog,
                loading: false,
                error: null

            };
        case actionTypes.Reset:
            return state = initialState;
        default:
            return state;
    }
};

export default CurrentBlog;