import initDialog from './initDialog';

const dialogReducer = ( state=initDialog, action ) =>{
    switch (action.type) {
        case 'OPEN_DIALOG' :{
            return{...state,open:!state.open}
        };
        case 'EDIT_DATA_DIALOG' :{
            let data = action.dataItem;
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
        default: return state
    }
}
export default dialogReducer