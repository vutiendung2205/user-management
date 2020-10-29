import initData from './initData'


const dataReducer = (state = initData, action) =>{
    switch (action.type){
        case 'GET_DATA_USER': {
            return action.dataUser
        }
        case 'DELETE_ITEM' :{
            let nextState = [];
            state.map( (data) =>{
                if( data._id !== action._id ){
                    nextState.push(data)
                }
            } )
            return nextState
        };
        case 'ADD_NEW_USER' :{
            return [...state,action.dataNewUser]
        }
        case 'EDIT_USER' :{
            let nextState = [];
            state.map( user =>{
                if(user._id === action.user._id){
                nextState.push(action.user)
                }else {
                    nextState.push(user)
                }
            } )  
            return nextState;
        }
        default: return state
    }
}
export default dataReducer;