import * as actionTypes from '../../Actions/ActionTypes';

const initialState = {
    profileproducts: [],
    loading: false,
    error: false,
}

const UserProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Fetch_UserProfile_Product_Start:
            return {
                ...state,
                loading: true,
                profileproducts: []
            };
        case actionTypes.Fetch_UserProfile_Product_Success:
            return {
                ...state,
                profileproducts: state.profileproducts.concat(action.profileproducts),
                loading: false,
                error: false
            };
        case actionTypes.Fetch_UserProfile_Product_Failed:
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

export default UserProfileReducer;