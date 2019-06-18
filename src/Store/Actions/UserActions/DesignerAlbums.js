import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';


export const fetchAlbumSuccess = (profilealbums) => {
    return {
        type: actionTypes.Fetch_DesignerProfile_Album_Success,
        profilealbums: profilealbums
    };
};

export const fetchAlbumFailed = (error) => {
    return {
        type: actionTypes.Fetch_DesignerProfile_Album_Failed,
        error: error
    };
};

export const fetchAlbumStart = () => {
    return {
        type: actionTypes.Fetch_DesignerProfile_Album_Start
    };
};

export const FetchDesignerAlbums = (token, limit) => {
    return dispatch => {
        //Album Fetch
        dispatch(fetchAlbumStart());
        axios.get('/api/fetchAlbumsByUser?access_token=' + token, {
            params: {
                limit: limit
            }
        })
            .then(res => {
                const fetchedProfileAlbums = [];
                for (let key in res.data) {
                    fetchedProfileAlbums.push({
                        ...res.data[key]
                    });
                }
                let data = fetchedProfileAlbums[1];
                let myData = Object.keys(data).map(key => {
                    return data[key];
                })
                // console.log(myData)
                dispatch(fetchAlbumSuccess(myData));
            })
            .catch(err => {
                dispatch(fetchAlbumFailed(err));
            });

    }
}