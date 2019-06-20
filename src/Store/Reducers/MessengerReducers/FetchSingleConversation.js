import * as actionTypes from '../../Actions/ActionTypes';


const initialState = {
    conversation: false,
    loading: false,
    error: false
}

const FetchSingleconvo = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Fetch_Single_Conversation_Start:
            return {
                ...state,
                loading: true,
                conversation: false
            };
        case actionTypes.Fetch_Single_Conversation_Success:
            return {
                ...state,
                conversation: action.conversation,
                loading: false,
                error: false
            };
        case actionTypes.Fetch_Single_Conversation_Failed:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.Reset:
            return state = initialState;
        default:
            return state;
    }
};

export default FetchSingleconvo;