import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';

export const updatealbumSuccess = (message) => {
    return {
        type: actionTypes.Update_AlbumSettings_Success,
        message: message
    };
};

export const updatealbumFailed = (error) => {
    return {
        type: actionTypes.Update_AlbumSettings_Failed,
        error: error
    };
};

export const updatealbumStart = () => {
    return {
        type: actionTypes.Update_AlbumSettings_Start
    };
};


export const UpdateAlbum = (token, updatedalbum) => {

    console.log(updatedalbum)
    return dispatch => {
        dispatch(updatealbumStart());
        axios.put('/api/updateAlbum?access_token=' + token, updatedalbum)
            .then(res => {
                console.log(res);
                dispatch(updatealbumSuccess(res.data.message));
            })
            .catch(err => {
                dispatch(updatealbumFailed(err.data.success));
            });
    }

}