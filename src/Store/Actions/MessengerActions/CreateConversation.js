import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const createConvosuccess = (conversation) => {
    return {
        type: actionTypes.Create_Conversation_Success,
        conversation: conversation
    };
};

export const createConvofailed = (error) => {
    return {
        type: actionTypes.Create_Conversation_Failed,
        error: error
    };
};

export const createConvostart = () => {
    return {
        type: actionTypes.Create_Conversation_Start
    };
};

export const CreateConversation = (token, userid) => {

    return dispatch => {
        dispatch(createConvostart());
        axios.get('/api/createConversation?access_token=' + token, {
            params: {
                userId: userid
            }
        })
            .then(res => {
                dispatch(createConvosuccess(res.data.conversation));
            })
            .catch(err => {
                dispatch(createConvofailed(err));
            });
    }
}

export const ResetConvo = () => {
    return {
        type: actionTypes.Create_Conversation_Reset
    };
}