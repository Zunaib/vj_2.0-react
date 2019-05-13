import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';


export const fetchcheckoutcartSuccess = (cart) => {
    return {
        type: actionTypes.Fetch_Checkout_Cart_Success,
        cart: cart
    };
};

export const fetchcheckoutcartFailed = (error) => {
    return {
        type: actionTypes.Fetch_Checkout_Cart_Failed,
        error: error
    };
};

export const fetchcheckoutcartStart = () => {
    return {
        type: actionTypes.Fetch_Checkout_Cart_Start
    };
};

export const FetchCheckoutCart = (token) => {
    return dispatch => {
        dispatch(fetchcheckoutcartStart());
        axios.get('/api/fetchCart?access_token=' + token)
            .then(res => {
                const fetchedProducts = [];
                for (let key in res.data) {
                    fetchedProducts.push({
                        ...res.data[key]
                    });
                }
                let data = fetchedProducts[0];
                let myData = Object.keys(data).map(key => {
                    return data[key];
                })

                console.log(myData)


                dispatch(fetchcheckoutcartSuccess(myData));
            })
            .catch(err => {
                console.log(err)
                dispatch(fetchcheckoutcartFailed(err.response.data.message));
            });
    }
}










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

export const checkoutFailed = (error) => {
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
                // dispatch(checkoutFailed(err.data.success));
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