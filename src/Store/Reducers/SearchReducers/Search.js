import * as actionTypes from '../../Actions/ActionTypes';

const initialState = {
    users: null,
    vlogs: null,
    products: null,
    blogs: null,
    error: null,
    loading: true
}

const SearchResults = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Search_Start:
            return {
                ...state,
                loading: true
            };
        case actionTypes.Search_Failed:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.Search_Success:
            return {
                ...state,
                users: action.searchresults.users,
                blogs: action.searchresults.blogs,
                vlogs: action.searchresults.vlogs,
                products: action.searchresults.products,
                loading: false,
                error: null

            };
        case actionTypes.Reset:
            return state = initialState;
        default:
            return state;
    }
};

export default SearchResults;