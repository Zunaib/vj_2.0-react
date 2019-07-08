import * as actionTypes from '../../Actions/ActionTypes';


const initialState = {
    products: [],
    loading: false,
    error: false
}

const FavProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Fetch_Fav_Products_Start:
            return {
                ...state,
                loading: true,
                products: []
            };
        case actionTypes.Fetch_Fav_Products_Success:
            return {
                ...state,
                products: state.products.concat(action.products),
                loading: false,
                error: false
            };
        case actionTypes.Fetch_Fav_Products_Failed:
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

export default FavProductsReducer;