import * as actionTypes from './ActionTypes';
import axios from '../../axios';



export const fetchProductSuccess = (profileproducts) => {
    return {
        type: actionTypes.Fetch_DesignerProfile_Product_Success,
        profileproducts: profileproducts
    };
};

export const fetchProductfailed = (error) => {
    return {
        type: actionTypes.Fetch_DesignerProfile_Product_Failed,
        error: error
    };
};

export const fetchProductStart = () => {
    return {
        type: actionTypes.Fetch_DesignerProfile_Product_Start
    };
};

export const fetchAlbumSuccess = (profilealbums) => {
    return {
        type: actionTypes.Fetch_DesignerProfile_Album_Success,
        profilealbums: profilealbums
    };
};

export const fetchAlbumfailed = (error) => {
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

export const FetchDesignerProfileContent = (token, limit) => {
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
                dispatch(fetchAlbumSuccess(myData));
            })
            .catch(err => {
                dispatch(fetchAlbumfailed(err));
            });

        //Product Fetch
        dispatch(fetchProductStart());
        axios.get('/api/fetchProductsByUser?access_token=' + token, {
            params: {
                limit: limit
            }
        })
            .then(res => {
                const fetchedProfileProducts = [];
                for (let key in res.data) {
                    fetchedProfileProducts.push({
                        ...res.data[key]
                    });
                }
                let data = fetchedProfileProducts[1];
                let myData = Object.keys(data).map(key => {
                    return data[key];
                })
                dispatch(fetchProductSuccess(myData));
            })
            .catch(err => {
                dispatch(fetchProductfailed(err));
            });

    }
}