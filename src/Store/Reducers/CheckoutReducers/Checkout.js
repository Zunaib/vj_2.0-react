import * as actionTypes from '../../Actions/ActionTypes';


const initialState = {
    settings: [],
    loading: false,
    error: null,
    message: null,
    saveDetails: false,
    cart: null
}

const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Set_Temporary:
            return {
                ...state,
                saveDetails: action.saveDetails
            };
        case actionTypes.Checkout_Refresh:
            return {
                ...state,
                message: null,
                loading: false
            };
        case actionTypes.Checkout_Start:
            return {
                ...state,
                loading: true
            };
        case actionTypes.Checkout_Success:
            return {
                ...state,
                loading: false,
                message: action.message
            };
        case actionTypes.Checkout_Failed:
            return {
                ...state,
                loading: false,
                message: action.error,
            };
        case actionTypes.Fetch_CheckoutSettings_Start:
            return {
                ...state,
                loading: true,
                settings: []
            };
        case actionTypes.Fetch_CheckoutSettings_Success:
            return {
                ...state,
                settings: state.settings.concat(action.UserSettings),
                loading: false,
                error: false
            };
        case actionTypes.Fetch_CheckoutSettings_Failed:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.Fetch_Checkout_Cart_Start:
            return {
                ...state,
                loading: true,
                cart: []
            };
        case actionTypes.Fetch_Checkout_Cart_Success:
            return {
                ...state,
                cart: state.cart.concat(action.cart),
                loading: false,
                error: false
            };
        case actionTypes.Fetch_Checkout_Cart_Failed:
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

export default checkoutReducer;