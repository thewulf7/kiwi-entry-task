import {
    FROM_CHANGED,
    TO_CHANGED,
    DATE_CHANGED,
    SEARCH_ACTION,
    SEARCH_ACTION_FAIL,
    SEARCH_ACTION_SUCCESS
} from './types';

export const fromChanged = (text) => {
    return {
        type: FROM_CHANGED,
        payload: text
    };
};

export const toChanged = (text) => {
    return {
        type: TO_CHANGED,
        payload: text
    };
};

export const dateChanged = (dateObj) => {
    return {
        type: DATE_CHANGED,
        payload: dateObj
    };
};

export const search = () => {

};
