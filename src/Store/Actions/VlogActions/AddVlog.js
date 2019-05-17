import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';


export const addvlogSuccess = (message) => {
    return {
        type: actionTypes.Add_Vlog_Success,
        message: message
    };
};

export const addvlogFailed = (error) => {
    return {
        type: actionTypes.Add_Vlog_Failed,
        error: error
    };
};

export const addvlogStart = () => {
    return {
        type: actionTypes.Add_Vlog_Start
    };
};


export const AddVlog = (token, data) => {
    return dispatch => {
        console.log('token in vlog ' + token);
        console.log(data);
        // dispatch(addvlogStart());
        axios.post('/api/addVlog?access_token=' + token, data)
            .then(res => {
                console.log(res)
                dispatch(addvlogSuccess(res.data.message));
            })
            .catch(err => {
                console.log(err)
                // dispatch(addalbumFailed(err.data.success));
            });
    }

}

export const VlogMsgRefresh = () => {
    return {
        type: actionTypes.Add_Vlog_Refresh
    }
}