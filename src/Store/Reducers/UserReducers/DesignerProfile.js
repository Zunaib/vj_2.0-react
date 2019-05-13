import * as actionTypes from '../../Actions/ActionTypes';

const initialState = {
    profileproducts: [],
    profilealbums: [],
    productloading: false,
    albumloading: false,
    producterror: false,
    albumerror: false
}

const DesignerProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Fetch_DesignerProfile_Album_Start:
            return {
                ...state,
                albumloading: true,
                profilealbums: []
            };
        case actionTypes.Fetch_DesignerProfile_Album_Success:
            return {
                ...state,
                profilealbums: state.profilealbums.concat(action.profilealbums),
                albumloading: false,
                albumerror: false
            };
        case actionTypes.Fetch_DesignerProfile_Album_Failed:
            return {
                ...state,
                albumloading: false,
                albumerror: action.error
            };
        case actionTypes.Fetch_DesignerProfile_Product_Start:
            return {
                ...state,
                productloading: true,
                profileproducts: []
            };
        case actionTypes.Fetch_DesignerProfile_Product_Success:
            return {
                ...state,
                profileproducts: state.profileproducts.concat(action.profileproducts),
                productloading: false,
                producterror: false
            };
        case actionTypes.Fetch_DesignerProfile_Product_Failed:
            return {
                ...state,
                productloading: false,
                producterror: action.error
            };
        case actionTypes.Reset:
            return state = initialState;
        default:
            return state;
    }
};

export default DesignerProfileReducer;