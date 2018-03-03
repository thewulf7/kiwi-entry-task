import moment from 'moment';
import {
    FROM_CHANGED,
    TO_CHANGED,
    DATE_CHANGED,
    DISMISS_ERROR,
    SEARCH_ACTION,
    SEARCH_ACTION_FAIL,
    SEARCH_ACTION_SUCCESS,
    SEARCH_LOCATION_ACTION,
    SEARCH_LOCATION_ACTION_SUCCESS,
    SEARCH_LOCATION_ACTION_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    fromValue: null,
    toValue: null,
    dateValue: moment().add(1, 'days'),
    errorFrom: '',
    errorTo: '',
    errorDate: '',
    loading: false,
    flightsList: [],
    flightsListError: null,
    fromSuggestions: [],
    toSuggestions: [],
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
        case SEARCH_LOCATION_ACTION:
            return { ...state };
        case SEARCH_LOCATION_ACTION_SUCCESS:
            return { ...state, [action.payload.prop]: action.payload.value };
        case SEARCH_LOCATION_ACTION_FAIL:
            return { ...state, fromSuggestions: [], toSuggestions: [] };
        default:
            return state;
    }
};
