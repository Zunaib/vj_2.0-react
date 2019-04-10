import * as actionTypes from './ActionTypes';
import axios from '../../axios';



export const fetchProductSuccess = (products) => {
    return {
        type: actionTypes.Fetch_Products_Success,
        products: products
    };
};

export const fetchProductfailed = (error) => {
    return {
        type: actionTypes.Fetch_Products_Failed,
        error: error
    };
};

export const fetchProductStart = () => {
    return {
        type: actionTypes.Fetch_Products_Start
    };
};

export const FetchProducts = (token) => {
    return dispatch => {
        dispatch(fetchProductStart());
        axios.get('/api/fetchAllProducts?access_token=' + token)
            .then(res => {
                const fetchedProducts = [];
                for (let key in res.data) {
                    fetchedProducts.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchProductSuccess(fetchedProducts));
            })
            .catch(err => {
                dispatch(fetchProductfailed(err));
            });
    }
}