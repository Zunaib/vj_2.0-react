import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const fetchproductSuccess = (product, similarproducts) => {
    return {
        type: actionTypes.Fetch_Single_Product_Success,
        product: product,
        similarproducts: similarproducts
    };
};

export const fetchproductFailed = (error) => {
    return {
        type: actionTypes.Fetch_Single_Product_Failed,
        error: error
    };
};

export const fetchproductStart = () => {
    return {
        type: actionTypes.Fetch_Single_Product_Start,
    };
};


export const FetchProduct = (token, productid) => {
    const product = {
        productId: productid
    }
    return dispatch => {
        dispatch(fetchproductStart());
        axios.post('/api/fetchSingleProductDetails?access_token=' + token, product)
            .then(res => {
                console.log(res)

                const fetchedProducts = [];
                for (let key in res.data) {
                    fetchedProducts.push({
                        ...res.data[key]
                    });
                }
                let data = fetchedProducts[2];
                let myData = Object.keys(data).map(key => {
                    return data[key];
                })

                if (myData.length === 0) {
                    myData = null;
                }
                dispatch(fetchproductSuccess(res.data.product, myData));
            })
            .catch(err => {
                console.log(err)
                dispatch(fetchproductFailed(err));
            });

    }



}
