import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';


export const addvlogSuccess = (vlogid) => {
    return {
        type: actionTypes.Add_Vlog_Success,
        vlogid: vlogid
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
        // dispatch(addalbumStart());
        axios.post('/api/addVlog?access_token=' + token, data)
            .then(res => {
                console.log(res)
                // dispatch(addvlogSuccess(res.data.album._id));
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