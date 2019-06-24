import * as actionTypes from '../../Actions/ActionTypes';

const initialState = {
    dropdowns: null,
    error: null,
    loading: true
}

const FetchProductDropdowns = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Add_Product_Fetch_Dropdown_Start:
            return {
                ...state,
                loading: true
            };
        case actionTypes.Add_Product_Fetch_Dropdown_Failed:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.Add_Product_Fetch_Dropdown_Success:
            return {
                ...state,
                dropdowns: action.dropdowns,
                loading: false,
                error: null

            };
        case actionTypes.Reset:
            return state = initialState;
        default:
            return state;
    }
};

export default FetchProductDropdowns;