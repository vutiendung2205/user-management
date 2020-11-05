import { createSlice } from '@reduxjs/toolkit';
const initSnackbar ={
    open    : false,
    messenger : ""
};

const snackbarReducer = createSlice({
    name: 'snackbarReducer',
    initialState: {...initSnackbar},
    reducers: {
        close_snackbar: (state,action) =>{
            return {...state,open : false}
        },
        notiSnackbar : (state,action) =>{
            return{
                open: true,
                messenger: action.payload
            }
        }
    }
});
const { reducer, actions } = snackbarReducer;
export const { close_snackbar, notiSnackbar} = actions;
export default reducer;