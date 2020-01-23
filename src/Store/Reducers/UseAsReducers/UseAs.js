import * as actionTypes from '../../Actions/ActionTypes';


const initialState = {
    creator: null,
}

const UseAsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Change_User_Flag_Customer:
            return {
                ...state,
                creator: false
            };
        case actionTypes.Change_User_Flag_Creator:
            return {
                ...state,
                creator: true
            };
        default:
            return state;
    }
}

export default UseAsReducer;