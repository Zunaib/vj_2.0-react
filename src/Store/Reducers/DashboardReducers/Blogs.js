import * as actionTypes from '../../Actions/ActionTypes';


const initialState = {
    Blogs: [],
    loading: false,
    error: false
}

const DashboardBlogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Fetch_Dash_Blogs_Start:
            return {
                ...state,
                loading: true,
                Blogs: []
            };
        case actionTypes.Fetch_Dash_Blogs_Success:
            return {
                ...state,
                Blogs: state.Blogs.concat(action.Blogs),
                loading: false,
                error: false
            };
        case actionTypes.Fetch_Dash_Blogs_Failed:
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

export default DashboardBlogsReducer;