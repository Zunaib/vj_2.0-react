import * as actionTypes from '../../Actions/ActionTypes';

const initialState = {
    cart: null,
    message: null,
    error: null,
    loading: true
}

const Cart = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Fetch_Cart_Start:
            return {
                ...state,
                loading: true
            };
        case actionTypes.Fetch_Cart_Failed:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.Fetch_Cart_Success:
            return {
                ...state,
                cart: action.cart,
                message: null,
                loading: false,
                error: null

            };
        case actionTypes.Reset:
            return state = initialState;
        default:
            return state;
    }
};

export default Cart;