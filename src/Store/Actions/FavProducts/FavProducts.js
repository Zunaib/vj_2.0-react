import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const fetchfavproductSuccess = (products) => {
    return {
        type: actionTypes.Fetch_Fav_Products_Success,
        products: products
    };
};

export const fetchfavproductFailed = (error) => {
    return {
        type: actionTypes.Fetch_Fav_Products_Failed,
        error: error
    };
};

export const fetchfavproductStart = () => {
    return {
        type: actionTypes.Fetch_Fav_Products_Start
    };
};

export const FetchFavProducts = (token) => {
    return dispatch => {
        dispatch(fetchfavproductStart());
        axios.get('/api/fetchFavoriteProducts?access_token=' + token)
            .then(res => {
                console.log(res)
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
                dispatch(fetchfavproductSuccess(myData));
            })
            .catch(err => {
                dispatch(fetchfavproductFailed(err));
            });
    }
}