import * as actionTypes from '../../Actions/ActionTypes';


const initialState = {
    error: null,
    loading: false,
    msg: null
};

const ContactUsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ContactUsForm_Start:
            return {
                ...state,
                loading: true,
                msg: null
            };
        case actionTypes.ContactUsForm_Success:
            return {
                ...state,
                loading: false,
                error: action.error,
                msg: action.msg
            };
        case actionTypes.ContactUsForm_Failed:
            return {
                ...state,
                loading: false,
                error: action.error,
                msg: null
            };
        case actionTypes.ContactUs_Msg:
            return {
                ...state,
                msg: null,
                error: null,

            };
        default:
            return state;
    }
};


export default ContactUsReducer;