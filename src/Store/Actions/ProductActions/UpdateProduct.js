import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const updateproductSuccess = (message) => {
    return {
        type: actionTypes.Delete_ProductSettings_Success,
        message: message
    };
};

export const updateproductFailed = (error) => {
    return {
        type: actionTypes.Delete_ProductSettings_Failed,
        error: error
    };
};

export const updateproductStart = () => {
    return {
        type: actionTypes.Delete_ProductSettings_Start
    };
};

export const UpdateProduct = (token, productId) => {

    return dispatch => {
        dispatch(updateproductStart())
        axios.delete('/api/deleteProduct?access_token=' + token, {
            params: {
                productId: productId
            }
        })
            .then(res => {
                console.log(res)
                dispatch(updateproductSuccess(res))
            })
            .catch(err => {
                console.log(err)
                dispatch(updateproductFailed(err))
            });
    }
}

export const MsgRefresh = () => {
    return {
        type: actionTypes.Update_AlbumMessage_Refresh
    }
}