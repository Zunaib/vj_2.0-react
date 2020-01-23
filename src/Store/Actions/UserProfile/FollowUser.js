import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';


export const followUserSuccess = () => {
    return {
        type: actionTypes.Follow_User_Success,

    };
};

export const followUserFailed = (error) => {
    return {
        type: actionTypes.Follow_User_Failed,
        error: error
    };
};

export const followUserStart = () => {
    return {
        type: actionTypes.Follow_User_Start
    };
};

export const FollowUser = (token, userid) => {
    return dispatch => {
        //Album Fetch
        // dispatch(followUserStart());
        axios.get('/api/followUser?access_token=' + token, {
            params: {
                userId: userid
            }
        })
            .then(res => {
                console.log(res)
                // console.log(myData)
                // dispatch(followUserSuccess(myData));
            })
            .catch(err => {
                console.log(err)
                // dispatch(followUserFailed(err));
            });

    }
}