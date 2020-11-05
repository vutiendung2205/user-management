import { createSlice } from '@reduxjs/toolkit';

const selectAll = createSlice({
    name: 'selectAll',
    initialState : [],
    reducers: {
        add_user_to_list : (state,action) =>{
            let _id = action.payload;
            state.push(_id);
        },
        remove_user_to_list : (state,action)=>{
            let newState = [];
            state.map( (_id) =>{
                if(_id !== action.payload){
                    newState.push(_id);
                }
            } )
            return newState;
        },
        add_all_user_to_list: (state,action) =>{
            return action.payload
        },
        remove_all_user_to_list: () => {
            return [];
        }
    }
})

const { reducer, actions } = selectAll;
export const { add_user_to_list, remove_user_to_list,add_all_user_to_list,remove_all_user_to_list } = actions;
export default reducer;