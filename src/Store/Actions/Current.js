import * as actionTypes from './ActionTypes';

export const SetCurrentProduct = (currentproduct) => {
    return {
        type: actionTypes.Set_Single_Product,
        currentproduct: currentproduct
    };
};

export const SetCurrentAlbum = (currentalbum) => {
    return {
        type: actionTypes.Set_Single_Album,
        currentalbum: currentalbum
    };
};