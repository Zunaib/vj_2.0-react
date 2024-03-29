import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const fetchSuccess = (UserSettings) => {
    return {
        type: actionTypes.Fetch_UserSettings_Success,
        UserSettings: UserSettings
    };
};

export const fetchFailed = (error) => {
    return {
        type: actionTypes.Fetch_UserSettings_Failed,
        error: error
    };
};

export const fetchStart = () => {
    return {
        type: actionTypes.Fetch_UserSettings_Start
    };
};

export const FetchSettings = (token) => {
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

                let data = [
                    fetchedUserSettings[1]
                ]


                dispatch(fetchSuccess(data));
            })
            .catch(err => {
                dispatch(fetchFailed(err));
            });
    }
}



export const updateSuccess = (message) => {
    return {
        type: actionTypes.Update_UserSettings_Success,
        message: message
    };
};

export const updateFailed = (error) => {
    return {
        type: actionTypes.Update_UserSettings_Failed,
        error: error
    };
};

export const updateStart = () => {
    return {
        type: actionTypes.Update_UserSettings_Start
    };
};


export const UpdateSettings = (token, settingsData) => {

    return dispatch => {
        dispatch(updateStart());
        axios.post('/api/changeSettings?access_token=' + token, settingsData)
            .then(res => {

                const fetchedUserSettings = [];
                for (let key in res.data) {
                    fetchedUserSettings.push({
                        ...res.data[key]
                    });
                }

                let data = [
                    fetchedUserSettings[1]
                ]


                dispatch(fetchSuccess(data));

                dispatch(updateSuccess(res.data.message));

            })
            .catch(err => {
                dispatch(updateFailed(err.data.success));
            });
    }

}

export const MsgRefresh = () => {
    return {
        type: actionTypes.Update_Message_Refresh
    }
}