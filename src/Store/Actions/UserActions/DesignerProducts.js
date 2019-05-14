import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';

export const fetchProductSuccess = (profileproducts) => {
    return {
        type: actionTypes.Fetch_DesignerProfile_Product_Success,
        profileproducts: profileproducts
    };
};

export const fetchProductFailed = (error) => {
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


export const FetchDesignerProducts = (token, limit) => {
    return dispatch => {

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
                console.log(data)
                dispatch(fetchProductSuccess(myData));
            })
            .catch(err => {
                dispatch(fetchProductFailed(err));
            });

    }
}