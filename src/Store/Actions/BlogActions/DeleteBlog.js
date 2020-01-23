import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const deleteblogSuccess = (message) => {
    return {
        type: actionTypes.Delete_Blog_Success,
        message: message
    };
};

export const deleteblogFailed = (error) => {
    return {
        type: actionTypes.Delete_Blog_Failed,
        error: error
    };
};

export const deleteblogStart = () => {
    return {
        type: actionTypes.Delete_Blog_Start
    };
};

export const DeleteBlog = (token, blogid) => {

    console.log(token)
    console.log(blogid)
    return dispatch => {
        dispatch(deleteblogStart())
        axios.delete('/api/deleteBlog?access_token=' + token, {
            params: {
                blogId: blogid
            }
        })
            .then(res => {
                console.log(res)
                dispatch(deleteblogSuccess(res.data.message))
            })
            .catch(err => {
                console.log(err)
                dispatch(deleteblogFailed(err))
            });
    }
}


export const DeleteBlogMsg = () => {
    return {
        type: actionTypes.Delete_Blog_Msg
    }
}