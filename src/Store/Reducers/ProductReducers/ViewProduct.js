import * as actionTypes from '../../Actions/ActionTypes';

const initialState = {
    currentproduct: null,
    similarproducts: null,
    error: null,
    loading: true
}

const CurrentProduct = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Fetch_Single_Product_Start:
            return {
                ...state,
                loading: true
            };
        case actionTypes.Fetch_Single_Product_Failed:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.Fetch_Single_Product_Success:
            return {
                ...state,
                currentproduct: action.product,
                similarproducts: action.similarproducts,
                loading: false,
                error: null

            };
        case actionTypes.Reset:
            return state = initialState;
        default:
            return state;
    }
};

export default CurrentProduct;