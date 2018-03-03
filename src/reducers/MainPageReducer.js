import {
    SEARCH_ACTION_FAIL,
    SEARCH_ACTION_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    initialState: true,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEARCH_ACTION_FAIL:
            return { ...state, initialState: true };
        case SEARCH_ACTION_SUCCESS:
            return { ...state, initialState: false };
        default:
            return state;
    }
};
