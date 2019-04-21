import * as actionTypes from './ActionTypes';

export const SetCurrentProduct = (currentproduct) => {
    localStorage.setItem('currentproduct', currentproduct);
    return {
        type: actionTypes.Set_Single_Product,
        currentproduct: currentproduct
    };
};

export const SetCurrentAlbum = (currentalbum) => {
    localStorage.setItem('currentalbum', currentalbum);
    return {
        type: actionTypes.Set_Single_Album,
        currentalbum: currentalbum
    };
};

export const SetCurrentonRefresh = (token, currentproduct, currentalbum) => {
    return dispatch => {
        if (token) {
            dispatch(SetCurrentAlbum(currentalbum));
            dispatch(SetCurrentProduct(currentproduct));
        }
    }
};
