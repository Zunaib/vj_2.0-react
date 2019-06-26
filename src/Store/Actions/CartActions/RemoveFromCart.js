import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const removeproductcartSuccess = (cart) => {
    return {
        type: actionTypes.Remove_ProductFromCart_Success,
        cart: cart
    };
};

export const removeproductcartFailed = (error) => {
    return {
        type: actionTypes.Remove_ProductFromCart_Failed,
        error: error
    };
};

export const removeproductcartStart = () => {
    return {
        type: actionTypes.Remove_ProductFromCart_Start,
    };
};

export const RemoveFromCart = (token, productid) => {

    const product = {
        productId: productid
    }
    return dispatch => {
        // dispatch(removeproductcartStart());
        axios.delete('/api/removeFromCart?access_token=' + token, product)
            .then(res => {

                console.log(res)
                // const fetchedProducts = [];
                // for (let key in res.data) {
                //     fetchedProducts.push({
                //         ...res.data[key]
                //     });
                // }
                // let data = fetchedProducts[0];
                // let myData = Object.keys(data).map(key => {
                //     return data[key];
                // })

                // console.log(myData)

                // dispatch(removeproductcartSuccess(myData));
            })
            .catch(err => {
                console.log(err)
                // dispatch(removeproductcartFailed(err.response.data.message));
            });
    }
}
