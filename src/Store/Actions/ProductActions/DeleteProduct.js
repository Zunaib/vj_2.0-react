import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const deleteproductSuccess = (message) => {
    return {
        type: actionTypes.Delete_ProductSettings_Success,
        message: message
    };
};

export const deleteproductFailed = (error) => {
    return {
        type: actionTypes.Delete_ProductSettings_Failed,
        error: error
    };
};

export const deleteproductStart = () => {
    return {
        type: actionTypes.Delete_ProductSettings_Start
    };
};

export const DeleteProductMsg = () => {
    return {
        type: actionTypes.Delete_ProductSettings_Msg
    };
};

export const DeleteProduct = (token, productId) => {
    return dispatch => {
        dispatch(deleteproductStart())
        axios.delete('/api/deleteProduct?access_token=' + token, {
            params: {
                productId: productId
            }
        })
            .then(res => {
                console.log(res)
                dispatch(deleteproductSuccess(res.data.message))
            })
            .catch(err => {
                console.log(err)
            });
    }
}
