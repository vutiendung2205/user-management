import {createSlice} from '@reduxjs/toolkit';
const initDialog = {
    open : false,
    _id: '',
    avatar: '',
    fistname: '',
    lastname: '',
    company: '',
    jobtitle: '',
    email: '',
    phone: ''
};
const dialogReducer = createSlice({
    name:'dialogReducer',
    initialState: {...initDialog},
    reducers: {
        open_dialog: (state,action)=>{
            return{...state,open:!state.open}
        },
        edit_data_dialog: (state,action)=>{
            let data = action.payload;
            return{...state,
                _id: data._id,
                avatar: data.avatar,
                fistname: data.fistname,
                lastname: data.lastname,
                company: data.company,
                jobtitle: data.jobtitle,
                email: data.email,
                phone: data.phone
            }
        }
    }
});

const { reducer, actions } = dialogReducer;
export const { open_dialog,edit_data_dialog } = actions;
export default reducer;


// const dialogReducer = ( state=initDialog, action ) =>{
//     switch (action.type) {
//         case 'OPEN_DIALOG' :{
//             return{...state,open:!state.open}
//         };
//         case 'EDIT_DATA_DIALOG' :{
//             let data = action.dataItem;
//             return{...state,
//                 _id: data._id,
//                 avatar: data.avatar,
//                 fistname: data.fistname,
//                 lastname: data.lastname,
//                 company: data.company,
//                 jobtitle: data.jobtitle,
//                 email: data.email,
//                 phone: data.phone
//             }
//         }
//         default: return state
//     }
// }
// export default dialogReducer