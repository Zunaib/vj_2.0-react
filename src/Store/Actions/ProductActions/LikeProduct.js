import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';


export const likeproductSuccess = (productid) => {
    return {
        type: actionTypes.Like_Product_Success,
        productid: productid
    };
};

export const likeproductFailed = (error) => {
    return {
        type: actionTypes.Like_Product_Failed,
        error: error
    };
};

export const likeproductStart = () => {
    return {
        type: actionTypes.Like_Product_Start
    };
};


export const LikeProduct = (token, productId) => {
    let data = {
        productId: productId
    }
    return dispatch => {
        // console.log('token in product ' + token);
        // dispatch(likeproductStart());
        axios.post('/api/likeProduct?access_token=' + token, data)
            .then(res => {
                console.log(res);
                // dispatch(likeproductSuccess(res.data.product._id));
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