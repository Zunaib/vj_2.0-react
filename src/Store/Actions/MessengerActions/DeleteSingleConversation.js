import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const deleteConvosuccess = (conversation) => {
    return {
        type: actionTypes.Delete_Conversation_Success,
        conversation: conversation
    };
};

export const deleteConvofailed = (error) => {
    return {
        type: actionTypes.Delete_Conversation_Failed,
        error: error
    };
};

export const deleteConvostart = () => {
    return {
        type: actionTypes.Delete_Conversation_Start
    };
};

export const DeleteSingleConversations = (token, convoId) => {

    return dispatch => {
        dispatch(deleteConvostart());
        axios.get('/api/deleteConversation?access_token=' + token, {
            params: {
                conversationId: convoId
            }
        })
            .then(res => {
                console.log(res)
                // dispatch(deleteConvosuccess(res.data.conversation));
            })
            .catch(err => {
                // dispatch(deleteConvofailed(err));
            });
    }
}

