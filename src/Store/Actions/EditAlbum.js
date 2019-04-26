import * as actionTypes from './ActionTypes';
import axios from '../../axios';



export const deletealbumSuccess = (message) => {
    return {
        type: actionTypes.Delete_AlbumSettings_Success,
        message: message
    };
};

export const deletealbumfailed = (error) => {
    return {
        type: actionTypes.Delete_AlbumSettings_Failed,
        error: error
    };
};

export const deletealbumStart = () => {
    return {
        type: actionTypes.Delete_AlbumSettings_Start
    };
};

export const DeleteAlbum = (token, albumid) => {
    let albumId = {
        albumId: albumid
    }
    return dispatch => {
        dispatch(deletealbumStart())
        axios.delete('/api/deleteAlbum?access_token=' + token, {
            params: {
                albumId: albumid
            }
        })
            .then(res => {
                console.log(res)
                dispatch(deletealbumSuccess(res))
            })
            .catch(err => {
                console.log(err)
                dispatch(deletealbumfailed(err))
            });
    }
}



export const updatealbumSuccess = (message) => {
    return {
        type: actionTypes.Update_AlbumSettings_Success,
        message: message
    };
};

export const updatealbumfailed = (error) => {
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


export const UpdateAlbumSettings = (token, albumSettingsData) => {

    console.log(albumSettingsData)
    return dispatch => {
        dispatch(updatealbumStart());
        axios.post('/api/updateAlbum?access_token=' + token, albumSettingsData)
            .then(res => {
                console.log(res);
                dispatch(updatealbumSuccess(res.data.message));
            })
            .catch(err => {
                dispatch(updatealbumfailed(err.data.success));
            });
    }

}

export const MsgRefresh = () => {
    return {
        type: actionTypes.Update_AlbumMessage_Refresh
    }
}