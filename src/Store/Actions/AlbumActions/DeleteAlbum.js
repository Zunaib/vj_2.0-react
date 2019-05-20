import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const deletealbumSuccess = (message) => {
    return {
        type: actionTypes.Delete_AlbumSettings_Success,
        message: message
    };
};

export const deletealbumFailed = (error) => {
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
    return dispatch => {
        dispatch(deletealbumStart())
        axios.delete('/api/deleteAlbum?access_token=' + token, {
            params: {
                albumId: albumid
            }
        })
            .then(res => {
                console.log(res)
                dispatch(deletealbumSuccess(res.data.message))
            })
            .catch(err => {
                console.log(err)
                dispatch(deletealbumFailed(err))
            });
    }
}


export const DeleteAlbumMsg = () => {
    return {
        type: actionTypes.Delete_AlbumSettings_Msg
    }
}