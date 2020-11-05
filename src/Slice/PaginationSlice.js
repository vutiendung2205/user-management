
import { createSlice } from '@reduxjs/toolkit';

const initPagination = {
    page: 0,
    rowPerPage : 5
};

const paginationReducer = createSlice({
    name: 'paginationReducer',
    initialState: {...initPagination},
    reducers: {
        set_page: (state,action)=>{
            return {...state,page: action.payload}
        },
        set_row_per_page: (state,action)=>{
            return {...state,rowPerPage: action.payload}
        }
    }
})

const { reducer, actions } = paginationReducer;
export const { set_page, set_row_per_page } = actions;
export default reducer;

