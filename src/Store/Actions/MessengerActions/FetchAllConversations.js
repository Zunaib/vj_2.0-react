import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const fetchallConvosuccess = (conversations) => {
    return {
        type: actionTypes.Fetch_All_Conversation_Success,
        conversations: conversations
    };
};

export const fetchallConvofailed = (error) => {
    return {
        type: actionTypes.Fetch_All_Conversation_Failed,
        error: error
    };
};

export const fetchallConvostart = () => {
    return {
        type: actionTypes.Fetch_All_Conversation_Start
    };
};

export const FetchAllConversations = (token, userid) => {
    return dispatch => {
        dispatch(fetchallConvostart());
        axios.get('/api/fetchAllConversations?access_token=' + token)
            .then(res => {
                dispatch(fetchallConvosuccess(res.data.conversations));
            })
            .catch(err => {
                dispatch(fetchallConvofailed(err));
            });
    }
}