import * as actionTypes from './ActionTypes';
import axios from '../../axios';

export const AuthStart = () => {
    return {
        type: actionTypes.Auth_Start
    };
};

export const AuthSuccess = (token) => {
    return {
        type: actionTypes.Auth_Success,
        token: token
    };
};

export const AuthFail = (error) => {
    return {
        type: actionTypes.Auth_Fail,
        error: error
    };
};


export const AuthLogout = () => {
    localStorage.removeItem('token');
    return {
        type: actionTypes.Auth_Logout
    };
};

export const ResetRedirect = () => {
    return {
        type: actionTypes.Auth_Reset_Redirect
    };
};

export const deAuth = () => {
    return dispatch => {
        axios.post('/api/logout')
            .then(response => {
                console.log(response);
                dispatch(AuthLogout());
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const Auth = (data, type) => {
    return dispatch => {
        dispatch(AuthStart());
        let url = null;
        if (type === "Login") {
            url = '/api/login';
        } else if (type === "Signup") {
            url = '/api/signup';
        }


        axios.post(url, data)
            .then(response => {
                console.log(response);
                localStorage.setItem('token', response.data.token);
                dispatch(AuthSuccess(response.data.token));
            })
            .catch(error => {
                console.log(error);
                dispatch(AuthFail(error));
            });
    };
};

export const AuthCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (!token) {
            dispatch(AuthLogout());
        } else {
            dispatch(AuthSuccess(token));
        }
    }
}