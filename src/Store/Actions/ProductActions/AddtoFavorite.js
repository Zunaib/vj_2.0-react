import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';


export const favproductSuccess = (productid) => {
    return {
        type: actionTypes.Fav_Product_Success,
        productid: productid
    };
};

export const favproductFailed = (error) => {
    return {
        type: actionTypes.Fav_Product_Failed,
        error: error
    };
};

export const favproductStart = () => {
    return {
        type: actionTypes.Fav_Product_Start
    };
};


export const AddtoFavorite = (token, productId) => {
    return dispatch => {
        // console.log('token in product ' + token);
        // dispatch(likeproductStart());
        axios.get('/api/addToFavoriteProducts?access_token=' + token, {
            params: {
                productId: productId
            }
        })
            .then(res => {
                console.log(res);
                // dispatch(likeproductSuccess(res.data.product._id));
            })
            .catch(err => {
                console.log(err)
                // dispatch(addproductFailed(err.data.success));
            });
    }

}

export const AddProductMsg = () => {
    return {
        type: actionTypes.Add_ProductMessage_Refresh
    }
}