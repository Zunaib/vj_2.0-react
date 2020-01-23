import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const fetchdashproductSuccess = (products) => {
    return {
        type: actionTypes.Fetch_Dash_Products_Success,
        products: products
    };
};

export const fetchdashproductFailed = (error) => {
    return {
        type: actionTypes.Fetch_Dash_Products_Failed,
        error: error
    };
};

export const fetchdashproductStart = () => {
    return {
        type: actionTypes.Fetch_Dash_Products_Start
    };
};

export const FetchDashProducts = (token) => {
    return dispatch => {
        dispatch(fetchdashproductStart());
        axios.get('/api/fetchAllProducts?access_token=' + token)
            .then(res => {
                console.log(res)
                const fetchedProducts = [];
                for (let key in res.data) {
                    fetchedProducts.push({
                        ...res.data[key]
                    });
                }
                let data = fetchedProducts[1];
                let myData = Object.keys(data).map(key => {
                    return data[key];
                })
                dispatch(fetchdashproductSuccess(myData));
            })
            .catch(err => {
                dispatch(fetchdashproductFailed(err));
            });
    }
}