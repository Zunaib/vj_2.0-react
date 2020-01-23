import * as actionTypes from '../ActionTypes';
import axios from '../../../axios';



export const sendMessegesuccess = (conversation) => {
    return {
        type: actionTypes.Send_Single_Messege_Success,
        conversation: conversation
    };
};

export const sendMessegefailed = (error) => {
    return {
        type: actionTypes.Send_Single_Messege_Failed,
        error: error
    };
};

export const sendMessegestart = () => {
    return {
        type: actionTypes.Send_Single_Messege_Start
    };
};

export const setSingleConvo = (conversation) => {
    return {
        type: actionTypes.Fetch_Single_Conversation_Success,
        conversation: conversation
    };
};

export const Messege = (token, data) => {

    return dispatch => {
        // dispatch(sendMessegestart());
        axios.post('/api/sendMessage?access_token=' + token, data)
            .then(res => {
                console.log(res)
                dispatch(setSingleConvo(res.data.conversation));
            })
            .catch(err => {
                // dispatch(sendMessegefailed(err));
            });
    }
}

