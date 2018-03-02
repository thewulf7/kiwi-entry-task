import {
    FROM_CHANGED,
    TO_CHANGED,
    DATE_CHANGED,
    DISMISS_ERROR,
    SEARCH_ACTION,
    SEARCH_ACTION_FAIL,
    SEARCH_ACTION_SUCCESS
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

export const searchFlights = (from, to, date) => async (dispatch) => {
    dispatch({ type: SEARCH_ACTION });
    try {
        const response = await getKiwiFlights(from, to, date);
        dispatch({ type: SEARCH_ACTION_SUCCESS, payload: response.data.allFlights });
    } catch (e) {
        dispatch({ type: SEARCH_ACTION_FAIL, payload: e.message });
    }
};

export const dismissError = () => {
    return {
        type: DISMISS_ERROR
    };
}
