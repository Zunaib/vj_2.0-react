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
                dispatch(fetchcartSuccess(myData));
            })
            .catch(err => {
                console.log(err)
                dispatch(fetchcartfailed(err.response.data.message));
            });
    }
}

export const updatecartSuccess = (cart) => {
    return {
        type: actionTypes.Update_Cart_Success,
        cart: cart
    };
};

export const updatecartfailed = (error) => {
    return {
        type: actionTypes.Update_Cart_Failed,
        error: error
    };
};

export const updatecartStart = () => {
    return {
        type: actionTypes.Update_Cart_Start,
    };
};

export const UpdateCart = (token) => {
    return dispatch => {
        dispatch(updatecartStart());
        axios.get('/api/fetchCart?access_token=' + token)
            .then(res => {

                console.log(res)

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


                // dispatch(updatecartSuccess(myData));
            })
            .catch(err => {
                console.log(err)
                // dispatch(updatecartfailed(err.response.data.message));
            });
    }
}
