import * as actionTypes from './ActionTypes';
import axios from '../../axios';



export const fetchproductSuccess = (product) => {
    return {
        type: actionTypes.Fetch_Single_Product_Success,
        product: product
    };
};

export const fetchproductfailed = (error) => {
    return {
        type: actionTypes.Fetch_Single_Product_Failed,
        error: error
    };
};

export const fetchproductStart = () => {
    return {
        type: actionTypes.Fetch_Single_Product_Start,
    };
};

export const FetchSingleProduct = (token, productid) => {
    const product = {
        productId: productid
    }
    return dispatch => {
        dispatch(fetchproductStart());
        axios.post('/api/fetchSingleProductDetails?access_token=' + token, product)
            .then(res => {
                dispatch(fetchproductSuccess(res.data.products));
            })
            .catch(err => {
                dispatch(fetchproductfailed(err));
            });
    }
}
