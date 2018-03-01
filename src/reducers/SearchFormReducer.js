import {
    FROM_CHANGED,
    TO_CHANGED,
    DATE_CHANGED,
    SEARCH_ACTION,
    SEARCH_ACTION_FAIL,
    SEARCH_ACTION_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    fromValue: null,
    toValue: null,
    dateValue: null,
    errorFrom: '',
    errorTo: '',
    errorDate: '',
    loading: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FROM_CHANGED:
            return { ...state, fromValue: action.payload };
        case TO_CHANGED:
            return { ...state, toValue: action.payload };
        case DATE_CHANGED:
            return { ...state, dateValue: action.payload };
        case SEARCH_ACTION:
            return { ...state, loading: true };
        case SEARCH_ACTION_FAIL:
            return { ...state, loading: false };
        case SEARCH_ACTION_SUCCESS:
            return { ...state, loading: false };
        default:
            return state;
    }
};
