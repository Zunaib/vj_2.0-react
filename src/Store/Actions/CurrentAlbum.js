import * as actionTypes from './ActionTypes';
import axios from '../../axios';



export const fetchalbumSuccess = (album) => {
    return {
        type: actionTypes.Fetch_Single_Album_Success,
        album: album
    };
};

export const fetchalbumfailed = (error) => {
    return {
        type: actionTypes.Fetch_Single_Album_Failed,
        error: error
    };
};

export const fetchalbumStart = () => {
    return {
        type: actionTypes.Fetch_Single_Album_Start,
    };
};

export const FetchSingleAlbum = (token, albumid) => {
    const album = {
        albumId: albumid
    }
    return dispatch => {
        dispatch(fetchalbumStart());
        axios.post('/api/fetchSingleAlbum?access_token=' + token, album)
            .then(res => {
                dispatch(fetchalbumSuccess(res.data.album));
            })
            .catch(err => {
                console.log(err)
                dispatch(fetchalbumfailed(err));
            });
    }
}
