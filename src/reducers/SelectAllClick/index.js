const initState = []
const selectAll = (state=initState, action) =>{
    switch (action.type) {
        case "ADD_USER_TO_LIST" :{
            return [...state, action._id];
        };
        case "REMOVE_USER_TO_LIST" :{
            let newState = [];
            state.map( (_id) =>{
                if(_id !== action._id){
                    newState.push(_id);
                }
            } )
            return newState;
        };
        case "ADD_ALL_USER_TO_LIST" :{
            return action.listId;
        };
        case "REMOVE_ALL_USER_TO_LIST" :{
            return [];
        };
        case "REMOVE_ID_WHILE_DELETED_USER" :{
            let newState = [];
            state.map( _id=>{
                if(_id !== action._id){
                    newState.push(_id)
                }
            } )
            return newState;
        };
        default : return state;
    }
}
export default selectAll;