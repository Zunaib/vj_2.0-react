import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';


export const fetchnotSuccess = (notifications) => {
    return {
        type: actionTypes.Fetch_Notification_Success,
        notifications: notifications
    };
};

export const fetchnotFailed = (error) => {
    return {
        type: actionTypes.Fetch_Notification_Failed,
        error: error
    };
};

export const fetchnotStart = () => {
    return {
        type: actionTypes.Fetch_Notification_Start
    };
};

export const FetchNotifications = (token, first) => {

    return dispatch => {
        //Album Fetch
        dispatch(fetchnotStart());
        axios.get('/api/fetchNotifications?access_token=' + token, {
            params: {
                firstTime: first
            }
        })
            .then(res => {
                dispatch(fetchnotSuccess(res.data.notifications));
            })
            .catch(err => {
                dispatch(fetchnotFailed(err));
            });

    }
}