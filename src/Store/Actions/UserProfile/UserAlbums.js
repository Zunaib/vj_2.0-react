import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';


export const fetchAlbumSuccess = (profilealbums) => {
    return {
        type: actionTypes.Fetch_UserProfile_Album_Success,
        profilealbums: profilealbums
    };
};

export const fetchAlbumFailed = (error) => {
    return {
        type: actionTypes.Fetch_UserProfile_Album_Failed,
        error: error
    };
};

export const fetchAlbumStart = () => {
    return {
        type: actionTypes.Fetch_UserProfile_Album_Start
    };
};

export const FetchUserAlbums = (token, userid, limit) => {
    return dispatch => {
        //Album Fetch
        dispatch(fetchAlbumStart());
        axios.get('/api/fetchAlbumsByUser?access_token=' + token, {
            params: {
                limit: limit,
                userId: userid
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