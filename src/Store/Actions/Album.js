import * as actionTypes from './ActionTypes';
import axios from '../../axios';


export const addalbumSuccess = (message) => {
    return {
        type: actionTypes.Add_Album_Success,
        message: message
    };
};

export const addalbumfailed = (error) => {
    return {
        type: actionTypes.Add_Album_Failed,
        error: error
    };
};

export const addalbumStart = () => {
    return {
        type: actionTypes.Add_Album_Start
    };
};


export const AddAlbum = (token, data) => {
    return dispatch => {
        console.log('token in album ' + token);
        console.log(data);
        // dispatch(addalbumStart());
        axios.post('/api/createAlbum?access_token=' + token, data)
            .then(res => {
                dispatch(addalbumSuccess(res.data.success));
            })
            .catch(err => {
                console.log(err)
                // dispatch(addalbumfailed(err.data.success));
            });
    }

}

export const AlbumMsgRefresh = () => {
    return {
        type: actionTypes.Add_Message_Refresh
    }
}