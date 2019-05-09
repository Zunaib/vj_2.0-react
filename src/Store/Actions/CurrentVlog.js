import * as actionTypes from './ActionTypes';
import axios from '../../axios';



export const fetchvlogSuccess = (vlog) => {
    return {
        type: actionTypes.Fetch_Single_Vlog_Success,
        vlog: vlog
    };
};

export const fetchvlogfailed = (error) => {
    return {
        type: actionTypes.Fetch_Single_Vlog_Failed,
        error: error
    };
};

export const fetchvlogStart = () => {
    return {
        type: actionTypes.Fetch_Single_Vlog_Start,
    };
};


export const FetchSingleVlog = (token, vlogid) => {
    const vlog = {
        vlogId: vlogid
    }
    return dispatch => {

        dispatch(fetchvlogStart());
        axios.post('/api/fetchSingleVlogDetails?access_token=' + token, vlog)
            .then(res => {
                // console.log(res)
                dispatch(fetchvlogSuccess(res.data.vlog));
            })
            .catch(err => {
                // console.log(err)
                dispatch(fetchvlogfailed(err));
            });

    }
}
