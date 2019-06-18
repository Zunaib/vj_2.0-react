import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';




export const fetchBlogSuccess = (profileblogs) => {
    return {
        type: actionTypes.Fetch_UserProfile_Blog_Success,
        profileblogs: profileblogs
    };
};

export const fetchBlogFailed = (error) => {
    return {
        type: actionTypes.Fetch_UserProfile_Blog_Failed,
        error: error
    };
};

export const fetchBlogStart = () => {
    return {
        type: actionTypes.Fetch_UserProfile_Blog_Start
    };
};

export const FetchUserBlogs = (token, userid, limit) => {
    return dispatch => {
        //Album Fetch
        dispatch(fetchBlogStart());
        axios.get('/api/fetchBlogsByUser?access_token=' + token, {
            params: {
                limit: limit,
                userId: userid
            }
        })
            .then(res => {
                const fetchedProfileBlogs = [];
                for (let key in res.data) {
                    fetchedProfileBlogs.push({
                        ...res.data[key]
                    });
                }
                let data = fetchedProfileBlogs[1];
                let myData = Object.keys(data).map(key => {
                    return data[key];
                })
                // console.log(myData)
                dispatch(fetchBlogSuccess(myData));
            })
            .catch(err => {
                dispatch(fetchBlogFailed(err));
            });
    }
}