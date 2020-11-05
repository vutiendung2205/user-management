import { createSlice } from '@reduxjs/toolkit';

const dataReducer = createSlice({
    name: 'dataReducer',
    initialState : [],
    reducers: {
        getData : (state,action) =>{
            return action.payload
        },
        removeUser: (state,action) =>{
            let nextState = [];
            state.map( (data) =>{
                if( data._id !== action.payload ){
                    nextState.push(data)
                }
            } )
            return nextState
        },
        addUser : (state,action) =>{
            return [...state,action.payload]
        },
        editUser: (state,action) =>{
            let nextState = [];
            state.map( user =>{
                if(user._id === action.payload._id){
                nextState.push(action.payload)
                }else {
                    nextState.push(user)
                }
            } )  
            return nextState;
        },
    }
})

const { reducer, actions } = dataReducer;
export const { getData,removeUser, addUser,editUser } = actions;
export default reducer;