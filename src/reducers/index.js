import { combineReducers } from 'redux';
import dataReducer from '../Slice/DataSlice';
import searchReducer from '../Slice/searchSlice';
import dialogReducer from '../Slice/DialogSlice';
import snackbarReducer from '../Slice/SnackbarSlice';
import sortReducer from '../Slice/SortSlice';
import selectAll from '../Slice/SelectAllSlice'
import paginationReducer from '../Slice/PaginationSlice';


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