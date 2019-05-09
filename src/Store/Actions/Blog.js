import * as actionTypes from './ActionTypes';
import axios from '../../axios';


export const addblogSuccess = (blogid) => {
    return {
        type: actionTypes.Add_Blog_Success,
        blogid: blogid
    };
};

export const addblogfailed = (error) => {
    return {
        type: actionTypes.Add_Blog_Failed,
        error: error
    };
};

export const addblogStart = () => {
    return {
        type: actionTypes.Add_Blog_Start
    };
};


export const AddBlog = (token, data) => {
    return dispatch => {
        console.log('token in blog ' + token);
        console.log(data);
        dispatch(addblogStart());
        axios.post('/api/createBlog?access_token=' + token, data)
            .then(res => {
                console.log(res)
                // dispatch(addblogSuccess(res.data.album._id));
            })
            .catch(err => {
                console.log(err)
                // dispatch(addalbumfailed(err.data.success));
            });
    }

}

export const BlogMsgRefresh = () => {
    return {
        type: actionTypes.Add_Blog_Refresh
    }
}