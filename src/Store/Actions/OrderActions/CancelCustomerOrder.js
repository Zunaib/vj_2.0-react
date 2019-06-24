import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const cancelorderSuccess = (orders) => {
    return {
        type: actionTypes.Cancel_Customer_Order_Success,
        orders: orders
    };
};

export const cancelorderFailed = (error) => {
    return {
        type: actionTypes.Cancel_Customer_Order_Failed,
        error: error
    };
};

export const cancelorderStart = () => {
    return {
        type: actionTypes.Cancel_Customer_Order_Start,
    };
};

export const cancelordersSuccess = (orders) => {
    return {
        type: actionTypes.Fetch_Customer_Orders_Success,
        orders: orders
    };
};
export const CencelOrder = (token, orderid) => {
    let data = {
        orderId: orderid
    }
    return dispatch => {
        // dispatch(fetchordersStart());
        axios.post('/api/cancelOrderByCustomer?access_token=' + token, data)
            .then(res => {
                console.log(res)
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


                dispatch(cancelordersSuccess(myData));
            })
            .catch(err => {
                console.log(err)
                // dispatch(fetchordersFailed(err.response.data.message));
            });
    }
}
