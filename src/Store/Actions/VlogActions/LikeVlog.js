import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';


export const likevlogSuccess = (vlogId) => {
    return {
        type: actionTypes.Like_Vlog_Success,
        vlogId: vlogId
    };
};

export const likevlogFailed = (error) => {
    return {
        type: actionTypes.Like_Vlog_Failed,
        error: error
    };
};

export const likevlogStart = () => {
    return {
        type: actionTypes.Like_Vlog_Start
    };
};


export const LikeVlog = (token, vlogId) => {
    console.log(vlogId)
    let data = {
        vlogId: vlogId
    }
    return dispatch => {
        // console.log('token in product ' + token);
        // dispatch(likeproductStart());
        axios.post('/api/likeVlog?access_token=' + token, data)
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