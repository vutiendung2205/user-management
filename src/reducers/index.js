import dataReducer from './Data/index';
import { combineReducers } from 'redux';
import searchReducer from './Search/index'
import dialogReducer from './Dialog';
import snackbarReducer from './Snackbar/index'
import sortReducer from './Sort';
import selectAll from './SelectAllClick/index'
import paginationReducer from './Pagination';


const rootReducer = combineReducers({
    data : dataReducer,
    searchKey : searchReducer,
    dialog : dialogReducer,
    snackbar : snackbarReducer,
    sort: sortReducer,
    pagination: paginationReducer,
    selectAll
  })

export default rootReducer;