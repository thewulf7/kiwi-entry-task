import moment from 'moment';
import {
    FROM_CHANGED,
    TO_CHANGED,
    DATE_CHANGED,
    DISMISS_ERROR,
    SEARCH_ACTION,
    SEARCH_ACTION_FAIL,
    SEARCH_ACTION_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    fromValue: 'PRG',
    toValue: 'LAX',
    dateValue: moment().add(1, 'days'),
    errorFrom: '',
    errorTo: '',
    errorDate: '',
    loading: false,
    flightsList: [],
    flightsListError: null
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
            return { ...state, loading: false, flightsListError: action.payload };
        case SEARCH_ACTION_SUCCESS:
            return {
                ...state,
                loading: false,
                flightsList: action.payload.edges,
                flightsListError: null
            };
        case DISMISS_ERROR:
            return {
                ...state,
                flightsListError: null
            };
        default:
            return state;
    }
};
