import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const fetchblogSuccess = (blog) => {
    return {
        type: actionTypes.Fetch_Single_Blog_Success,
        blog: blog
    };
};

export const fetchblogFailed = (error) => {
    return {
        type: actionTypes.Fetch_Single_Blog_Failed,
        error: error
    };
};

export const fetchblogStart = () => {
    return {
        type: actionTypes.Fetch_Single_Blog_Start,
    };
};


export const FetchSingleBlog = (token, blogid) => {
    const blog = {
        blogId: blogid
    }

    console.log(blogid)
    return dispatch => {

        dispatch(fetchblogStart());
        axios.post('/api/fetchSingleBlogDetails?access_token=' + token, blog)
            .then(res => {
                console.log(res)
                dispatch(fetchblogSuccess(res.data.blog[0]));
            })
            .catch(err => {
                // console.log(err)
                dispatch(fetchblogFailed(err));
            });

    }
}
