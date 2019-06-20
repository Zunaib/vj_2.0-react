import * as actionTypes from '../../Actions/ActionTypes';


const initialState = {
    conversations: false,
    loading: false,
    error: false
}

const FetchAllconvo = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Fetch_All_Conversation_Start:
            return {
                ...state,
                loading: true,
                conversations: false
            };
        case actionTypes.Fetch_All_Conversation_Success:
            return {
                ...state,
                conversations: action.conversations,
                loading: false,
                error: false
            };
        case actionTypes.Fetch_All_Conversation_Failed:
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

export default FetchAllconvo;