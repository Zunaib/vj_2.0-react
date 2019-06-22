import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const productCommentSuccess = (message) => {
    return {
        type: actionTypes.Product_Comment_Success,
        message: message
    };
};

export const productCommentFailed = (error) => {
    return {
        type: actionTypes.Product_Comment_Failed,
        error: error
    };
};

export const productCommentStart = () => {
    return {
        type: actionTypes.Product_Comment_Start
    };
};

export const fetchproductSuccess = (product, similarproducts) => {
    return {
        type: actionTypes.Fetch_Single_Product_Success,
        product: product,
        similarproducts: similarproducts
    };
};

export const ProductComment = (token, data) => {
    return dispatch => {
        axios.post('/api/addProductComment?access_token=' + token, data)
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
            });
    }
}
