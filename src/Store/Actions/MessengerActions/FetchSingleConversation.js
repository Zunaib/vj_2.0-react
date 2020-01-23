import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const fetchsingleConvosuccess = (conversation) => {
    return {
        type: actionTypes.Fetch_Single_Conversation_Success,
        conversation: conversation
    };
};

export const fetchsingleConvofailed = (error) => {
    return {
        type: actionTypes.Fetch_Single_Conversation_Failed,
        error: error
    };
};

export const fetchsingleConvostart = () => {
    return {
        type: actionTypes.Fetch_Single_Conversation_Start
    };
};

export const FetchSingleConversations = (token, convoid) => {
    return dispatch => {
        dispatch(fetchsingleConvostart());
        axios.get('/api/fetchConversation?access_token=' + token, {
            params: {
                conversationId: convoid
            }
        })
            .then(res => {
                console.log(res)
                dispatch(fetchsingleConvosuccess(res.data.conversation));
            })
            .catch(err => {
                dispatch(fetchsingleConvofailed(err));
            });
    }
}