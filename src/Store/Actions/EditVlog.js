import * as actionTypes from './ActionTypes';
import axios from '../../axios';



export const fetchSuccess = (vlog) => {
    return {
        type: actionTypes.Fetch_Single_Vlog_Success,
        vlog: vlog
    };
};

export const fetchfailed = (error) => {
    return {
        type: actionTypes.Fetch_Single_Vlog_Failed,
        error: error
    };
};

export const fetchStart = () => {
    return {
        type: actionTypes.Fetch_Single_Vlog_Start
    };
};

export const FetchVlogToUpdate = (token, vlogid) => {

    const vlog = {
        vlogId: vlogid
    }
    return dispatch => {

        dispatch(fetchStart());
        axios.post('/api/fetchSingleVlogDetails?access_token=' + token, vlog)
            .then(res => {
                // console.log(res)
                dispatch(fetchSuccess(res.data.vlog));
            })
            .catch(err => {
                // console.log(err)
                dispatch(fetchfailed(err));
            });

    }
}



export const updateSuccess = (message) => {
    return {
        type: actionTypes.Update_Single_Vlog_Success,
        message: message
    };
};

export const updatefailed = (error) => {
    return {
        type: actionTypes.Update_Single_Vlog_Failed,
        error: error
    };
};

export const updateStart = () => {
    return {
        type: actionTypes.Update_Single_Vlog_Start
    };
};


export const UpdateVlog = (token, vlog) => {

    console.log('token in edit vlog uodate' + token)
    console.log(vlog)
    return dispatch => {
        // dispatch(updateStart());
        axios.put('/api/updateVlog?access_token=' + token, vlog)
            .then(res => {
                console.log(res);
                // dispatch(updateSuccess(res.data.message));
            })
            .catch(err => {
                console.log(err)
                // dispatch(updatefailed(err.data.success));
            });
    }

}

export const MsgRefresh = () => {
    return {
        type: actionTypes.Update_Message_Refresh
    }
}