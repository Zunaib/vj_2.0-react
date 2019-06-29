import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const addtocartSuccess = (message) => {
    return {
        type: actionTypes.Add_ProductToCart_Success,
        message: message
    };
};

export const addtocartfailed = (error) => {
    return {
        type: actionTypes.Add_ProductToCart_Failed,
        error: error
    };
};

export const addtocartStart = () => {
    return {
        type: actionTypes.Add_ProductToCart_Start,
    };
};

export const AddToCart = (token, productId, color, size) => {

    const product = {
        productId: productId,
        selectedSize: size,
        selectedColor: color
    }
    return dispatch => {
        dispatch(addtocartStart());
        axios.post('/api/addToCart?access_token=' + token, product)
            .then(res => {
                dispatch(addtocartSuccess(res));
            })
            .catch(err => {
                dispatch(addtocartfailed(err.response.data.message));
            });
    }
}

export const AddToCartMsg = () => {
    return {
        type: actionTypes.Add_ProductToCart_Msg,
    };
};