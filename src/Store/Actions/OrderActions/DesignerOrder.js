import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const fetchordersSuccess = (orders) => {
    return {
        type: actionTypes.Fetch_Designer_Orders_Success,
        orders: orders
    };
};

export const fetchordersFailed = (error) => {
    return {
        type: actionTypes.Fetch_Designer_Orders_Failed,
        error: error
    };
};

export const fetchordersStart = () => {
    return {
        type: actionTypes.Fetch_Designer_Orders_Start,
    };
};

export const FetchDesignerOrders = (token) => {

    console.log('called')
    return dispatch => {
        dispatch(fetchordersStart());
        axios.get('/api/fetchdesignerOrders?access_token=' + token)
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

                dispatch(fetchordersSuccess(myData));
            })
            .catch(err => {
                console.log(err)
                dispatch(fetchordersFailed(err.response.data.message));
            });
    }
}
