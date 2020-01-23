import * as actionTypes from '../../Actions/ActionTypes';


const initialState = {
    conversation: false,
    loading: false,
    error: false
}

const CreateConvoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Create_Conversation_Start:
            return {
                ...state,
                loading: true,
                conversation: false
            };
        case actionTypes.Create_Conversation_Success:
            return {
                ...state,
                conversation: action.conversation,
                loading: false,
                error: false
            };
        case actionTypes.Create_Conversation_Failed:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.Create_Conversation_Reset:
            return {
                ...state,
                conversation: false,
                loading: false,
                error: null
            };
        case actionTypes.Reset:
            return state = initialState;
        default:
            return state;
    }
};

export default CreateConvoReducer;