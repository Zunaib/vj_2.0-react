import * as actionTypes from './ActionTypes';
import axios from '../../axios';

export const fetchSuccess = (UserSettings) => {
    return {
        type: actionTypes.Fetch_CheckoutSettings_Success,
        UserSettings: UserSettings
    };
};

export const fetchfailed = (error) => {
    return {
        type: actionTypes.Fetch_CheckoutSettings_Failed,
        error: error
    };
};

export const fetchStart = () => {
    return {
        type: actionTypes.Fetch_CheckoutSettings_Start
    };
};

export const FetchCheckoutSettings = (token) => {
    return dispatch => {
        dispatch(fetchStart());
        axios.get('/api/fetchUserSettings?access_token=' + token)
            .then(res => {
                const fetchedUserSettings = [];
                for (let key in res.data) {
                    fetchedUserSettings.push({
                        ...res.data[key]
                    });
                }
                let data = fetchedUserSettings[1];
                console.log(data)
                dispatch(fetchSuccess(data));
            })
            .catch(err => {
                dispatch(fetchfailed(err));
            });
    }
}



export const checkoutSuccess = (message) => {
    return {
        type: actionTypes.Checkout_Success,
        message: message
    };
};

export const checkoutfailed = (error) => {
    return {
        type: actionTypes.Checkout_Failed,
        error: error
    };
};

export const checkoutStart = () => {
    return {
        type: actionTypes.Checkout_Start
    };
};


export const Checkout = (token, order) => {
    return dispatch => {

        console.log(order)
        // dispatch(checkoutStart());
        axios.post('/api/placeOrder?access_token=' + token, order)
            .then(res => {
                console.log(res);
                // console.log(res.data.success);
                // dispatch(checkoutSuccess(res.data.success));
            })
            .catch(err => {
                // dispatch(checkoutfailed(err.data.success));
            });
    }

}

export const MsgRefresh = () => {
    return {
        type: actionTypes.Checkout_Refresh
    }
}
export const SetTemporary = (saveDetails) => {
    return {
        type: actionTypes.Set_Temporary,
        saveDetails: saveDetails
    }
}