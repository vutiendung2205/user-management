import { createSlice } from '@reduxjs/toolkit';

const searchReducer = createSlice({
    name: 'searchReducer',
    initialState: '',
    reducers: {
        searchData: (state,action) =>{
            return action.payload;
        }
    }
})
const {  reducer, actions} = searchReducer;
export const { searchData } = actions;
export default reducer;