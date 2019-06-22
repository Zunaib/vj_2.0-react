import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const blogCommentSuccess = (message) => {
    return {
        type: actionTypes.Blog_Comment_Success,
        message: message
    };
};

export const blogCommentFailed = (error) => {
    return {
        type: actionTypes.Blog_Comment_Failed,
        error: error
    };
};

export const blogCommentStart = () => {
    return {
        type: actionTypes.Blog_Comment_Start
    };
};

export const fetchblogSuccess = (blog) => {
    return {
        type: actionTypes.Fetch_Single_Blog_Success,
        blog: blog
    };
};



export const BlogComment = (token, data) => {
    return dispatch => {
        axios.post('/api/addBlogComment?access_token=' + token, data)
            .then(res => {
                dispatch(fetchblogSuccess(res.data.blogs))
            })
            .catch(err => {
                console.log(err)
            });
    }
}
