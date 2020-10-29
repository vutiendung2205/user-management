import initSnackBar from './initSnackbar';

const snackbarReducer = ( state=initSnackBar, action ) =>{
    switch (action.type) {
        case "CLOSE_SNRACKBAR" :{
            return {...state,open : false}
        }
        case "SHOW_MESSENGER" :{
            return{
                open: true,
                messenger: action.messenger
            }
        }
        default: return state
    }
}
export default snackbarReducer;