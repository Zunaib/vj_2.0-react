import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const fetchdashBlogsuccess = (Blogs) => {
    return {
        type: actionTypes.Fetch_Dash_Blogs_Success,
        Blogs: Blogs
    };
};

export const fetchdashproductFailed = (error) => {
    return {
        type: actionTypes.Fetch_Dash_Blogs_Failed,
        error: error
    };
};

export const fetchdashBlogstart = () => {
    return {
        type: actionTypes.Fetch_Dash_Blogs_Start
    };
};

export const FetchDashBlogs = (token) => {
    return dispatch => {
        dispatch(fetchdashBlogstart());
        axios.get('/api/fetchAllBlogs?access_token=' + token)
            .then(res => {
                console.log(res)
                const fetchedBlogs = [];
                for (let key in res.data) {
                    fetchedBlogs.push({
                        ...res.data[key]
                    });
                }
                let data = fetchedBlogs[1];
                let myData = Object.keys(data).map(key => {
                    return data[key];
                })
                dispatch(fetchdashBlogsuccess(myData));
            })
            .catch(err => {
                dispatch(fetchdashproductFailed(err));
            });
    }
}