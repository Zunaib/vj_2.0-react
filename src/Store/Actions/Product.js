import * as actionTypes from './ActionTypes';
import axios from '../../axios';


export const addproductSuccess = (message) => {
    return {
        type: actionTypes.Add_Product_Success,
        message: message
    };
};

export const addproductfailed = (error) => {
    return {
        type: actionTypes.Add_Product_Failed,
        error: error
    };
};

export const addproductStart = () => {
    return {
        type: actionTypes.Add_Product_Start
    };
};


export const AddProduct = (token, productData) => {
    return dispatch => {
        console.log('token in product ' + token);
        // dispatch(addproductStart());
        console.log(productData)
        axios.post('/api/addProduct?access_token=' + token, productData)
            .then(res => {
                console.log(res);
                // dispatch(addproductSuccess(res.data.success));
            })
            .catch(err => {
                console.log(err)
                // dispatch(addproductfailed(err.data.success));
            });
    }

}

export const ProductMsgRefresh = () => {
    return {
        type: actionTypes.Add_ProductMessage_Refresh
    }
}