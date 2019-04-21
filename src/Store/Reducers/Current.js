import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    currentproduct: null,
    currentalbum: null
}

const CurrentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Set_Single_Product:
            return {
                ...state,
                currentproduct: action.currentproduct
            };
        case actionTypes.Set_Single_Album:
            return {
                ...state,
                currentalbum: action.currentalbum
            };
        case actionTypes.Reset:
            return state = initialState;
        default:
            return state;
    }
};

export default CurrentReducer;