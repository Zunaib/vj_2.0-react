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