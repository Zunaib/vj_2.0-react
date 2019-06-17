import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';


export const searchStart = () => {
    return {
        type: actionTypes.Search_Start
    };
};
export const searchFailed = () => {
    return {
        type: actionTypes.Search_Failed
    };
};
export const searchSuccess = (searchresults) => {
    return {
        type: actionTypes.Search_Success,
        searchresults: searchresults
    };
};



export const Search = (token, data) => {

    return dispatch => {
        dispatch(searchStart())
        axios.post('/api/search?access_token=' + token, data)
            .then(res => {
                console.log(res)
                dispatch(searchSuccess(res.data));
            })
            .catch(err => {
                dispatch(searchFailed(err))
            });
    }

}
