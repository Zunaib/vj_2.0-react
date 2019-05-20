import * as actionTypes from '../../Actions/ActionTypes';

const initialState = {
    added: false,
    message: null,
    error: null,
    loading: true
}

const AddtoCart = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Add_ProductToCart_Start:
            return {
                ...state,
                added: false,
                loading: true
            };
        case actionTypes.Add_ProductToCart_Failed:
            return {
                ...state,
                loading: false,
                added: false,
                error: action.error
            };
        case actionTypes.Add_ProductToCart_Success:
            return {
                ...state,
                message: action.message,
                added: true,
                loading: false,
                error: null

            };
        case actionTypes.Add_ProductToCart_Msg:
            return {
                ...state,
                added: false,
                error: null,

            };
        case actionTypes.Reset:
            return state = initialState;
        default:
            return state;
    }
};

export default AddtoCart;