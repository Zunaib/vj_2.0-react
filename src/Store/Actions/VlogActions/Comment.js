import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const vlogCommentSuccess = (message) => {
    return {
        type: actionTypes.Vlog_Comment_Success,
        message: message
    };
};

export const vlogCommentFailed = (error) => {
    return {
        type: actionTypes.Vlog_Comment_Failed,
        error: error
    };
};

export const vlogCommentStart = () => {
    return {
        type: actionTypes.Vlog_Comment_Start
    };
};

export const fetchvlogSuccess = (vlog) => {
    return {
        type: actionTypes.Fetch_Single_Vlog_Success,
        vlog: vlog
    };
};

export const VlogComment = (token, data) => {
    return dispatch => {
        axios.post('/api/addVlogComment?access_token=' + token, data)
            .then(res => {
                console.log(res)
                dispatch(fetchvlogSuccess(res.data.vlogs));
            })
            .catch(err => {
                console.log(err)
            });
    }
}
