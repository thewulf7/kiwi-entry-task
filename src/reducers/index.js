import { combineReducers } from 'redux';

import SearchFormReducer from './SearchFormReducer';
import MainPageReducer from './MainPageReducer';

export default combineReducers(
    {
        search: SearchFormReducer,
        mainPage: MainPageReducer
    }
);
