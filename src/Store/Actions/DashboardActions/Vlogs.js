import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const fetchdashVlogsuccess = (Vlogs) => {
    return {
        type: actionTypes.Fetch_Dash_Vlogs_Success,
        Vlogs: Vlogs
    };
};

export const fetchdashproductFailed = (error) => {
    return {
        type: actionTypes.Fetch_Dash_Vlogs_Failed,
        error: error
    };
};

export const fetchdashVlogstart = () => {
    return {
        type: actionTypes.Fetch_Dash_Vlogs_Start
    };
};

export const FetchDashVlogs = (token) => {
    return dispatch => {
        dispatch(fetchdashVlogstart());
        axios.get('/api/fetchAllVlogs?access_token=' + token)
            .then(res => {
                console.log(res)
                const fetchedVlogs = [];
                for (let key in res.data) {
                    fetchedVlogs.push({
                        ...res.data[key]
                    });
                }
                let data = fetchedVlogs[1];
                let myData = Object.keys(data).map(key => {
                    return data[key];
                })
                dispatch(fetchdashVlogsuccess(myData));
            })
            .catch(err => {
                dispatch(fetchdashproductFailed(err));
            });
    }
}