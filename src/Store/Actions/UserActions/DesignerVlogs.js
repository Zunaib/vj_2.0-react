import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';




export const fetchVlogSuccess = (profilevlogs) => {
    return {
        type: actionTypes.Fetch_DesignerProfile_Vlog_Success,
        profilevlogs: profilevlogs
    };
};

export const fetchVlogFailed = (error) => {
    return {
        type: actionTypes.Fetch_DesignerProfile_Vlog_Failed,
        error: error
    };
};

export const fetchVlogStart = () => {
    return {
        type: actionTypes.Fetch_DesignerProfile_Vlog_Start
    };
};

export const FetchDesignerVlogs = (token, limit) => {
    return dispatch => {
        //Album Fetch
        dispatch(fetchVlogStart());
        axios.get('/api/fetchVlogsByUser?access_token=' + token, {
            params: {
                limit: limit
            }
        })
            .then(res => {
                const fetchedProfileVlogs = [];
                for (let key in res.data) {
                    fetchedProfileVlogs.push({
                        ...res.data[key]
                    });
                }
                let data = fetchedProfileVlogs[1];
                let myData = Object.keys(data).map(key => {
                    return data[key];
                })
                // console.log(myData)
                dispatch(fetchVlogSuccess(myData));
            })
            .catch(err => {
                dispatch(fetchVlogFailed(err));
            });
    }
}