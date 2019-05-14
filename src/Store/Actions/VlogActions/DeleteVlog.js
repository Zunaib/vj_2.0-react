import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const deletevlogSuccess = (message) => {
    return {
        type: actionTypes.Delete_Vlog_Success,
        message: message
    };
};

export const deletevlogFailed = (error) => {
    return {
        type: actionTypes.Delete_Vlog_Failed,
        error: error
    };
};

export const deletevlogStart = () => {
    return {
        type: actionTypes.Delete_Vlog_Start
    };
};

export const DeleteVlog = (token, vlogid) => {
    return dispatch => {
        dispatch(deletevlogStart())
        axios.delete('/api/deleteVlog?access_token=' + token, {
            params: {
                vlogId: vlogid
            }
        })
            .then(res => {
                console.log(res)
                dispatch(deletevlogSuccess(res.data.message))
            })
            .catch(err => {
                console.log(err)
                dispatch(deletevlogFailed(err))
            });
    }
}


export const MsgRefresh = () => {
    return {
        type: actionTypes.Update_AlbumMessage_Refresh
    }
}