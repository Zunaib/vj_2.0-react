import * as actionTypes from '../../Actions/ActionTypes';

const initialState = {
    loading: true,
    error: null,
    deleted: null
}

const DeleteProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Delete_ProductSettings_Start:
            return {
                ...state,
                loading: true,
                deleted: null
            };
        case actionTypes.Delete_ProductSettings_Success:
            return {
                ...state,
                deleted: action.message,
                loading: false,
                error: false
            };
        case actionTypes.Delete_ProductSettings_Failed:
            return {
                ...state,
                loading: false,
                error: action.error,
                deleted: null
            };
        case actionTypes.Delete_ProductSettings_Msg:
            return {
                ...state,
                loading: false,
                error: null,
                deleted: false
            };
        case actionTypes.Reset:
            return state = initialState;
        default:
            return state;
    }
};

export default DeleteProductReducer;