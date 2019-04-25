import * as actionTypes from './ActionTypes';
import axios from '../../axios';



export const fetchordersSuccess = (orders) => {
    return {
        type: actionTypes.Fetch_Customer_Orders_Success,
        orders: orders
    };
};

export const fetchordersfailed = (error) => {
    return {
        type: actionTypes.Fetch_Customer_Orders_Failed,
        error: error
    };
};

export const fetchordersStart = () => {
    return {
        type: actionTypes.Fetch_Customer_Orders_Start,
    };
};

export const FetchOrders = (token) => {
    return dispatch => {
        // dispatch(fetchordersStart());
        axios.get('/api/fetchCustomerOrders?access_token=' + token)
            .then(res => {
                // console.log(res)
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

                // console.log(myData)


                dispatch(fetchordersSuccess(myData));
            })
            .catch(err => {
                console.log(err)
                dispatch(fetchordersfailed(err.response.data.message));
            });
    }
}
