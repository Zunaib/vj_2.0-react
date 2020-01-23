import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const fetchalbumSuccess = (album) => {
    return {
        type: actionTypes.Fetch_Single_Album_Success,
        album: album
    };
};

export const fetchalbumFailed = (error) => {
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

export const fetchalbumproductsSuccess = (albumproducts) => {
    return {
        type: actionTypes.Fetch_Single_AlbumProduct_Success,
        albumproducts: albumproducts
    };
};

export const fetchalbumproductsFailed = (error) => {
    return {
        type: actionTypes.Fetch_Single_AlbumProduct_Failed,
        producterror: error
    };
};

export const fetchalbumproductsStart = () => {
    return {
        type: actionTypes.Fetch_Single_AlbumProduct_Start,
    };
};

export const FetchAlbum = (token, albumid) => {
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
                dispatch(fetchalbumFailed(err));
            });

        dispatch(fetchalbumproductsStart());
        axios.post('/api/fetchProductsByAlbums?access_token=' + token, album)
            .then(res => {

                const fetchedProducts = [];
                for (let key in res.data) {
                    fetchedProducts.push({
                        ...res.data[key]
                    });
                }
                let data = fetchedProducts[1];
                let myData = Object.keys(data).map(key => {
                    return data[key];
                })
                dispatch(fetchalbumproductsSuccess(myData));
            })
            .catch(err => {
                dispatch(fetchalbumproductsFailed(err));
            });

    }
}
