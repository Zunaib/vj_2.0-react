import * as actionTypes from './ActionTypes';
import axios from '../../axios';

export const AuthStart = () => {
    return {
        type: actionTypes.Auth_Start
    };
};

export const AuthSuccess = (token, userId) => {
    return {
        type: actionTypes.Auth_Success,
        token: token,
        userId: userId
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
    localStorage.removeItem('userId');
    return {
        type: actionTypes.Auth_Logout
    };
};

export const Reset = () => {
    return {
        type: actionTypes.Reset
    };
}

export const ResetRedirect = () => {
    return {
        type: actionTypes.Auth_Reset_Redirect
    };
};

export const deAuth = () => {
    console.log('in deauth');
    return dispatch => {
        axios.get('/api/logout')
            .then(response => {
                console.log("from logout " + response);
                dispatch(AuthLogout());
                dispatch(Reset());
            })
            .catch(error => {
                console.log("from logout " + error);
                console.log("from logout " + error.message);
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
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.userId);
                dispatch(AuthSuccess(response.data.token, response.data.userId));
                if (type === "Signup") {
                    dispatch(ResetRedirect());
                }
            })
            .catch(error => {
                dispatch(AuthFail(error.response.data.message));
            });
    };
};

export const AuthCheckState = (token, userId) => {
    return dispatch => {
        if (!token) {
            dispatch(AuthLogout());
        } else {
            dispatch(AuthSuccess(token, userId));
        }
    }
}

export const ErrRefresh = () => {
    return {
        type: actionTypes.Auth_Error_Refresh
    }
}