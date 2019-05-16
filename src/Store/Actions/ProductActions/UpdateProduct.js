import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const updateproductSuccess = (message) => {
    return {
        type: actionTypes.Update_Single_Product_Success,
        message: message
    };
};

export const updateproductFailed = (error) => {
    return {
        type: actionTypes.Update_Single_Product_Failed,
        error: error
    };
};

export const updateproductStart = () => {
    return {
        type: actionTypes.Update_Single_Product_Start
    };
};

export const UpdateProduct = (token, updatedProduct) => {
    return dispatch => {
        dispatch(updateproductStart())
        axios.put('/api/updateProduct?access_token=' + token, updatedProduct)
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