import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';


export const ContactUsSuccess = (userdata, contactUsData) => {
    return {
        type: actionTypes.ContactUsForm_Success,
        userData: userdata,
        contactUsData: contactUsData


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
                dispatch(ContactUsSuccess(response.data, contactUsData));
            })
            .catch(error => {
                dispatch(ContactUsFailed(error));
            });

    }
}