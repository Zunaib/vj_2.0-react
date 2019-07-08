import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';


export const ContactUsSuccess = (userdata, contactUsData, msg) => {
    return {
        type: actionTypes.ContactUsForm_Success,
        userData: userdata,
        contactUsData: contactUsData,
        msg: msg


    }
}
export const ContactUsFailed = (error) => {
    return {
        type: actionTypes.ContactUsForm_Failed,
        error: error
    }
}


export const ContactUsFormStart = () => {
    return {
        type: actionTypes.ContactUsForm_Start
    }
}

export const ContactUsForm = (contactUsData) => {
    return dispatch => {
        dispatch(ContactUsFormStart());
        axios.post('/api/contactUs', contactUsData)
            .then(response => {
                console.log(response)
                dispatch(ContactUsSuccess(response.data, contactUsData, response.data.message));
            })
            .catch(error => {
                dispatch(ContactUsFailed(error));
            });

    }
}

export const ContactUsMsg = () => {
    return {
        type: actionTypes.ContactUs_Msg,
    };
};
