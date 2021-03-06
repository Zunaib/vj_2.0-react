import * as actionTypes from '../../Actions/ActionTypes';


const initialState = {
    loading: true,
    error: null,
    updated: null
}

const ProductUpdateReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Update_Single_Product_Msg:
            return {
                ...state,
                updated: null,
                loading: false
            };
        case actionTypes.Update_Single_Product_Start:
            return {
                ...state,
                loading: true
            };
        case actionTypes.Update_Single_Product_Success:
            return {
                ...state,
                loading: false,
                updated: action.message,
                error: null
            };
        case actionTypes.Update_Single_Product_Failed:
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

export default ProductUpdateReducer;