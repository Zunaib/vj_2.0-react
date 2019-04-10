import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    error: null,
    loading: false
};

const ContactUsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ContactUsForm_Start:
            return {
                ...state,
                loading: true
            };
        case actionTypes.ContactUsForm_Success:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.ContactUsForm_Failed:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default ContactUsReducer;