import { createSlice } from '@reduxjs/toolkit';

const initSort ={
    order       : 'asc',
    orderBy     : 'fistname'
}

const sortReducer = createSlice({
    name: 'sortReducer',
    initialState: {...initSort},
    reducers: {
        set_order : (state, action) =>{
            return{...state,order: action.payload}
        },
        set_orderBy: (state,action) =>{
            return{...state,orderBy:action.payload}
        }
    }
});

const { reducer, actions } = sortReducer;
export const { set_order,set_orderBy } = actions;
export default reducer;