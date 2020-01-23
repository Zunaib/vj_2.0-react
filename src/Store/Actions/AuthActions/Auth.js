import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';

export const AuthStart = () => {
    return {
        type: actionTypes.Auth_Start
    };
};

export const AuthSuccess = (token, userId, creator, firsttime) => {
    return {
        type: actionTypes.Auth_Success,
        token: token,
        userId: userId,
        creator: creator,
        firsttime: firsttime
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
    localStorage.removeItem('creator');
    localStorage.removeItem('firstTime');

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
    return dispatch => {
        axios.get('/api/logout')
            .then(response => {
                dispatch(AuthLogout());
                dispatch(Reset());
            })
            .catch(error => {
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

                console.log(response)

                if (type === "Login") {

                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.userId);
                    localStorage.setItem('creator', response.data.userflags.isCreator);
                    localStorage.setItem('firstTime', response.data.userflags.firstTimeLogin);
                    dispatch(AuthSuccess(response.data.token, response.data.userId, response.data.userflags.isCreator, response.data.userflags.firstTimeLogin));

                }

                if (type === "Signup") {
                    dispatch(AuthSuccess(response.data.token, response.data.userId));
                    dispatch(ResetRedirect());
                }
            })
            .catch(error => {
                dispatch(AuthFail(error.response.data));
            });
    };
};


export const AuthCheckState = (token, userId, creator, firstTime) => {
    return dispatch => {
        if (!token) {
            dispatch(AuthLogout());
        } else {
            dispatch(AuthSuccess(token, userId, creator, firstTime));
        }
    }
}



export const ErrRefresh = () => {
    return {
        type: actionTypes.Auth_Error_Refresh
    }
}