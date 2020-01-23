import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';


export const addalbumSuccess = (albumid) => {
    return {
        type: actionTypes.Add_Album_Success,
        albumid: albumid
    };
};

export const addalbumFailed = (error) => {
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
                console.log(res)
                dispatch(addalbumSuccess(res.data.album._id));
            })
            .catch(err => {
                console.log(err)
                // dispatch(addalbumFailed(err.data.success));
            });
    }

}

export const AlbumMsgRefresh = () => {
    return {
        type: actionTypes.Add_AlbumMessage_Refresh
    }
}