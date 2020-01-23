import * as actionTypes from '../../Actions/ActionTypes';

const initialState = {
    notifications: null,
    loading: true,
    error: null
}

const NotificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Fetch_Notification_Start:
            return {
                ...state,
                loading: true,
                notifications: null
            };
        case actionTypes.Fetch_Notification_Success:
            return {
                ...state,
                loading: false,
                notifications: action.notifications
            };
        case actionTypes.Fetch_Notification_Failed:
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

export default NotificationsReducer;