import * as actionTypes from './ActionTypes';
import axios from '../../axios';



export const fetchSuccess = (UserSettings) => {
    return {
        type: actionTypes.Fetch_NavSetting_Success,
        UserSettings: UserSettings
    };
};

export const fetchfailed = (error) => {
    return {
        type: actionTypes.Fetch_NavSetting_Failed,
        error: error
    };
};

export const fetchStart = () => {
    return {
        type: actionTypes.Fetch_NavSetting_Start
    };
};

export const FetchUserSettings = (token) => {
    return dispatch => {
        dispatch(fetchStart());
        axios.get('/api/fetchUserSettings?access_token=' + token)
            .then(res => {
                const fetchedUserSettings = [];
                for (let key in res.data) {
                    fetchedUserSettings.push({
                        ...res.data[key]
                    });
                }
                let data = fetchedUserSettings[1];
                dispatch(fetchSuccess(data));
            })
            .catch(err => {
                dispatch(fetchfailed(err));
            });
    }
}
