import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    loading: false,
    error: null,
    productid: null
}

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Add_ProductMessage_Refresh:
            return {
                ...state,
                productid: null,
                loading: false
            };
        case actionTypes.Add_Product_Start:
            return {
                ...state,
                loading: true
            };
        case actionTypes.Add_Product_Success:
            return {
                ...state,
                loading: false,
                productid: action.productid
            };
        case actionTypes.Add_Product_Failed:
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

export default ProductReducer;