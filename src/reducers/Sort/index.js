import initSort from './initSort';

const sortReducer = ( state=initSort, action ) =>{
    switch (action.type) {
        case 'SET_ORDER':{
            return{...state,order: action.order}
        }
        case 'SET_ORDERBY':{
            return{...state,orderBy:action.orderBy}
        }
        default: return state
    }
}
export default sortReducer;