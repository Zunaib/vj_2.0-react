import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    orders: null,
    message: null,
    error: null,
    loading: false
}

const Cart = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Fetch_Designer_Orders_Start:
            return {
                ...state,
                loading: true
            };
        case actionTypes.Fetch_Designer_Orders_Failed:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.Fetch_Designer_Orders_Success:
            return {
                ...state,
                orders: action.orders,
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