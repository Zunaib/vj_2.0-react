import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';


export const addproductSuccess = (productid) => {
    return {
        type: actionTypes.Add_Product_Success,
        productid: productid
    };
};

export const addproductFailed = (error) => {
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
        dispatch(addproductStart());
        console.log(productData)
        axios.post('/api/addProduct?access_token=' + token, productData)
            .then(res => {
                console.log(res);
                dispatch(addproductSuccess(res.data.product._id));
            })
            .catch(err => {
                console.log(err)
                // dispatch(addproductFailed(err.data.success));
            });
    }

}

export const AddProductMsg = () => {
    return {
        type: actionTypes.Add_ProductMessage_Refresh
    }
}