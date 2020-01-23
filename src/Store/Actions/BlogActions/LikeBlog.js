import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';


export const likeblogSuccess = (blogId) => {
    return {
        type: actionTypes.Like_Blog_Success,
        blogId: blogId
    };
};

export const likeblogFailed = (error) => {
    return {
        type: actionTypes.Like_Blog_Failed,
        error: error
    };
};

export const likeblogStart = () => {
    return {
        type: actionTypes.Like_Blog_Start
    };
};


export const LikeBlog = (token, blogId) => {
    console.log(blogId)
    let data = {
        blogId: blogId
    }
    return dispatch => {
        // console.log('token in product ' + token);
        // dispatch(likeproductStart());
        axios.post('/api/likeBlog?access_token=' + token, data)
            .then(res => {
                console.log(res);
                // dispatch(likeproductSuccess(res.data.product._id));
            })
            .catch(err => {
                console.log(err)
                // dispatch(addproductFailed(err.data.success));
            });
    }

}

export const AddProductMsg = () => {
    return {
        type: actionTypes.Add_ProductMessage_Refresh
    }
}