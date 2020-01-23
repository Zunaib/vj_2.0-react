import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const fetchproductdropdownsSuccess = (dropdowns) => {
    return {
        type: actionTypes.Add_Product_Fetch_Dropdown_Success,
        dropdowns: dropdowns
    };
};

export const fetchproductdropdownsFailed = (error) => {
    return {
        type: actionTypes.Add_Product_Fetch_Dropdown_Failed,
        error: error
    };
};

export const fetchproductdropdownsStart = () => {
    return {
        type: actionTypes.Add_Product_Fetch_Dropdown_Start,
    };
};


export const Fetchproductdropdowns = (token) => {
    return dispatch => {
        // dispatch(fetchproductdropdownsStart());
        axios.get('/api/fetchAllDropdowns?access_token=' + token)
            .then(res => {
                console.log(res)

                dispatch(fetchproductdropdownsSuccess(res.data.dropdown));
            })
            .catch(err => {
                console.log(err)
                dispatch(fetchproductdropdownsFailed(err));
            });

    }



}
