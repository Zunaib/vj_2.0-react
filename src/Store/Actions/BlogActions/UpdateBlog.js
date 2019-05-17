import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';


export const updateSuccess = (message) => {
    return {
        type: actionTypes.Update_Single_Blog_Success,
        message: message
    };
};

export const updatefailed = (error) => {
    return {
        type: actionTypes.Update_Single_Blog_Failed,
        error: error
    };
};

export const updateStart = () => {
    return {
        type: actionTypes.Update_Single_Blog_Start
    };
};


export const UpdateBlog = (token, blog) => {

    console.log('token in edit blog uodate' + token)
    console.log(blog)
    return dispatch => {
        dispatch(updateStart());
        axios.put('/api/updateBlog?access_token=' + token, blog)
            .then(res => {
                console.log(res);
                dispatch(updateSuccess(res.data.message));
            })
            .catch(err => {
                console.log(err)
                dispatch(updatefailed(err.data.success));
            });
    }

}

export const MsgRefresh = () => {
    return {
        type: actionTypes.Update_Message_Refresh
    }
}