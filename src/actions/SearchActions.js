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
} from './types';
import { getKiwiFlights, getKiwiLocations } from '../services';

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

export const searchFlights = (from, to, date, after = '', before = '', locale = 'en_US', currency = 'EUR') => async (dispatch) => {
    const updatingContent = after !== '' || before !== '';

    dispatch({ type: updatingContent ? SEARCH_ACTION_UPDATE : SEARCH_ACTION });
    try {
        const response = await getKiwiFlights(from, to, date, before, after, currency, locale);
        dispatch({
            type: updatingContent ? SEARCH_ACTION_UPDATE_SUCCESS : SEARCH_ACTION_SUCCESS,
            payload: response.data.allFlights
        });
    } catch (e) {
        dispatch({
            type: updatingContent ? SEARCH_ACTION_UPDATE_FAIL : SEARCH_ACTION_FAIL,
            payload: e.message
        });
    }
};

export const searchLocation = (text, prop) => async (dispatch) => {
    dispatch({ type: SEARCH_LOCATION_ACTION });
    try {
        const response = await getKiwiLocations(text);
        dispatch(
            {
                type: SEARCH_LOCATION_ACTION_SUCCESS,
                payload: {
                    prop,
                    value: response.data.allLocations.edges.map(item => item.node)
                }
            }
        );
    } catch (e) {
        dispatch({ type: SEARCH_LOCATION_ACTION_FAIL, payload: e.message });
    }
};

export const dismissError = () => {
    return {
        type: DISMISS_ERROR
    };
};
