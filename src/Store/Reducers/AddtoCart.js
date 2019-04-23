import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    message: null,
    error: null,
    loading: true
}

const AddtoCart = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Add_ProductToCart_Start:
            return {
                ...state,
                loading: true
            };
        case actionTypes.Add_ProductToCart_Failed:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.Add_ProductToCart_Success:
            return {
                ...state,
                message: action.message,
                loading: false,
                error: null

            };
        case actionTypes.Reset:
            return state = initialState;
        default:
            return state;
    }
};

export default AddtoCart;