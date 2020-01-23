import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const fetchSuccess = (UserSettings) => {
    return {
        type: actionTypes.Fetch_SearcedUserSettings_Success,
        UserSettings: UserSettings
    };
};

export const fetchFailed = (error) => {
    return {
        type: actionTypes.Fetch_SearcedUserSettings_Failed,
        error: error
    };
};

export const fetchStart = () => {
    return {
        type: actionTypes.Fetch_SearcedUserSettings_Start
    };
};

export const FetchSearchedUserSettings = (token, userid) => {

    return dispatch => {
        dispatch(fetchStart());
        axios.get('/api/fetchUserSettings?access_token=' + token, {
            params: {
                userId: userid
            }
        })
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
                dispatch(fetchFailed(err));
            });
    }
}

