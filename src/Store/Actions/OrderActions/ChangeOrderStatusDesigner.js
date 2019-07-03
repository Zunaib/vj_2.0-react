import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const changeorderstatusSuccess = (orders) => {
    return {
        type: actionTypes.Change_Order_Status_Success,
        orders: orders
    };
};

export const changeorderstatusFailed = (error) => {
    return {
        type: actionTypes.Change_Order_Status_Failed,
        error: error
    };
};

export const changeorderstatustart = () => {
    return {
        type: actionTypes.Change_Order_Status_Start,
    };
};

export const fetchordersSuccess = (orders) => {
    return {
        type: actionTypes.Fetch_Designer_Orders_Success,
        orders: orders
    };
};

export const ChangeOrderStatus = (token, orderid, status) => {
    let data = {
        designerOrderId: orderid,
        status: status
    }

    return dispatch => {
        // dispatch(fetchordersStart());
        axios.post('/api/changeOrderStatus?access_token=' + token, data)
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


                dispatch(fetchordersSuccess(myData));
            })
            .catch(err => {
                console.log(err)
                // dispatch(changeorderstatusFailed(err.response.data.message));
            });
    }
}
