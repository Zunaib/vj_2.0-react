import * as actionTypes from './ActionTypes';
import axios from '../../axios';



export const fetchSuccess = (products) => {
    return {
        type: actionTypes.Fetch_Products_Success,
        products: products
    };
};

export const fetchfailed = (error) => {
    return {
        type: actionTypes.Fetch_Products_Failed,
        error: error
    };
};

export const fetchStart = () => {
    return {
        type: actionTypes.Fetch_Products_Start
    };
};

export const Fetch = (token) => {
    return dispatch => {
        dispatch(fetchStart());
        axios.get('/api/fetchAllProducts?access_token=' + token)
            .then(res => {
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
                dispatch(fetchSuccess(myData));
            })
            .catch(err => {
                dispatch(fetchfailed(err));
            });
    }
}