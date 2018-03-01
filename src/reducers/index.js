import { combineReducers } from 'redux';

import SearchFormReducer from './SearchFormReducer';

export default combineReducers(
    {
        search: SearchFormReducer,
    }
);
