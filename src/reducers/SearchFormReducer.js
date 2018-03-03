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
    SEARCH_LOCATION_ACTION_FAIL,
    SEARCH_ACTION_UPDATE,
    SEARCH_ACTION_UPDATE_SUCCESS,
    SEARCH_ACTION_UPDATE_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    fromValue: 'PRG',
    toValue: 'JFK',
    dateValue: moment().add(1, 'days'),
    errorFrom: '',
    errorTo: '',
    errorDate: '',
    loading: false,
    flightsList: [],
    flightsListError: null,
    fromSuggestions: [],
    toSuggestions: [],
    pageInfo: {
        loading: false,
        endCursor: null,
        hasNextPage: false
    }
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
            return { ...state, loading: true, flightsListError: null };
        case SEARCH_ACTION_FAIL:
            return { ...state, loading: false, flightsListError: action.payload };
        case SEARCH_ACTION_SUCCESS:
            return {
                ...state,
                loading: false,
                flightsList: action.payload.edges,
                flightsListError: null,
                pageInfo: {
                    endCursor: action.payload.pageInfo.endCursor,
                    hasNextPage: action.payload.pageInfo.hasNextPage,
                },
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
        case SEARCH_ACTION_UPDATE:
            return { ...state, pageInfo: { ...state.pageInfo, loading: true } };
        case SEARCH_ACTION_UPDATE_SUCCESS:
            return {
                ...state,
                flightsList: [
                    ...state.flightsList,
                    ...action.payload.edges
                ],
                pageInfo: {
                    endCursor: action.payload.pageInfo.endCursor,
                    hasNextPage: action.payload.pageInfo.hasNextPage,
                    loading: false
                },
                flightsListError: null
            };
        case SEARCH_ACTION_UPDATE_FAIL:
            return { ...state, pageInfo: { ...state.pageInfo, loading: false }, flightsListError: action.payload };
        default:
            return state;
    }
};
