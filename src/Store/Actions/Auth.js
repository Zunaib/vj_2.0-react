import * as actionTypes from './ActionTypes';
import axios from '../../axios';

export const AuthStart = () => {
    return {
        type: actionTypes.Auth_Start
    };
};

export const AuthSuccess = (token, userId, flag) => {
    return {
        type: actionTypes.Auth_Success,
        token: token,
        userId: userId,
        flag: flag
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
    localStorage.removeItem('userflag');
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
                let flag = null;
                if (type === "Login") {
                    let flags = response.data.userflags;
                    if (flags.isCustomer) {
                        flag = 'Customer'
                    } else if (flags.isDesigner) {
                        flag = 'Designer'
                    } else if (flags.isVlogger) {
                        flag = 'Vlogger'
                    } else if (flags.isBlogger) {
                        flag = 'Blogger'
                    }
                }
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('userflag', flag);
                dispatch(AuthSuccess(response.data.token, response.data.userId, flag));
                if (type === "Signup") {
                    dispatch(ResetRedirect());
                }
            })
            .catch(error => {
                console.log(error)
                dispatch(AuthFail(error.response.data));
            });
    };
};

export const UpdateFlagToDesigner = (token) => {
    return dispatch => {
        axios.get('/api/useAsDesigner?access_token=' + token)
            .then(response => {
                localStorage.setItem('userflag', 'Designer');
                dispatch(flagchanged('Designer'));
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
    };
};
export const UpdateFlagToBlogger = (token) => {
    return dispatch => {
        axios.get('/api/useAsBlogger?access_token=' + token)
            .then(response => {
                localStorage.setItem('userflag', 'Blogger');
                dispatch(flagchanged('Blogger'));
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
    };
};
export const UpdateFlagToVlogger = (token) => {
    return dispatch => {
        axios.get('/api/useAsVlogger?access_token=' + token)
            .then(response => {
                localStorage.setItem('userflag', 'Vlogger');
                dispatch(flagchanged('Vlogger'));
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
    };
};
export const UpdateFlagToCustomer = (token) => {
    return dispatch => {
        axios.get('/api/useAsCustomer?access_token=' + token)
            .then(response => {
                localStorage.setItem('userflag', 'Customer');
                console.log('cust flag')
                dispatch(flagchanged('Customer'));
            })
            .catch(error => {
                console.log(error)
            });
    };
};

export const AuthCheckState = (token, userId, userflag) => {
    return dispatch => {
        if (!token) {
            dispatch(AuthLogout());
        } else {
            dispatch(AuthSuccess(token, userId, userflag));
        }
    }
}

export const flagchanged = (flag) => {
    return {
        type: actionTypes.Set_User_Flag,
        flag: flag
    }
}

export const ErrRefresh = () => {
    return {
        type: actionTypes.Auth_Error_Refresh
    }
}