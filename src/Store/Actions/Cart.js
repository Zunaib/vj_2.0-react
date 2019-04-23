import * as actionTypes from './ActionTypes';
import axios from '../../axios';



export const fetchcartSuccess = (cart) => {
    return {
        type: actionTypes.Fetch_Cart_Success,
        cart: cart
    };
};

export const fetchcartfailed = (error) => {
    return {
        type: actionTypes.Fetch_Cart_Failed,
        error: error
    };
};

export const fetchcartStart = () => {
    return {
        type: actionTypes.Fetch_Cart_Start,
    };
};

export const FetchCart = (token) => {

    return dispatch => {
        dispatch(fetchcartStart());
        axios.get('/api/fetchCart?access_token=' + token)
            .then(res => {
                const fetchedProducts = [];
                for (let key in res.data) {
                    fetchedProducts.push({
                        ...res.data[key]
                    });
                }
                let data = fetchedProducts[0];
                let myData = Object.keys(data).map(key => {
                    return data[key];
                })

                console.log(myData)


                dispatch(fetchcartSuccess(myData));
            })
            .catch(err => {
                console.log(err)
                dispatch(fetchcartfailed(err.response.data.message));
            });
    }
}
