import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';


export const changeuserFlagCustomer = () => {
    return {
        type: actionTypes.Change_User_Flag_Customer
    };
};

export const changeuserFlagCreator = () => {
    return {
        type: actionTypes.Change_User_Flag_Creator
    };
};


export const UseAsCustomer = (token) => {
    return dispatch => {
        axios.get('/api/useAsCustomer?access_token=' + token)
            .then(res => {
                localStorage.setItem('creator', false);
                localStorage.setItem('firstTime', false);
                dispatch(changeuserFlagCustomer());
            })
            .catch(err => {
                console.log(err)
            });
    }

}


export const UseAsCreator = (token) => {
    return dispatch => {
        axios.get('/api/useAsCreator?access_token=' + token)
            .then(res => {
                localStorage.setItem('creator', true);
                localStorage.setItem('firstTime', false);
                dispatch(changeuserFlagCreator());
            })
            .catch(err => {
                console.log(err)
            });
    }

}