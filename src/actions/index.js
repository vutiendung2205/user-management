import { addNewUser, deleteUser, editDataUser, getDataUser } from "../components/Api/callApi"



//  get data user while start
export const getDataRequest = () =>{
    return (dispatch) =>{
        return getDataUser()
        .then( res =>{
            dispatch( getData(res.data) )
        } )
    }
}
export const getData = (dataUser) =>{
    return{
        type : "GET_DATA_USER",
        dataUser
    }
}

// edit data user
export const editUserRequest = (user) =>{
    return (dispatch) =>{
        return editDataUser(user)
        .then( res =>{
            dispatch( editUser(user) )
        } )
        .then( res =>{
            dispatch( notiSnackbar("Edited!") )
        } )
    }
}
export const editUser = (user) =>{
    return{
        type: "EDIT_USER",
        user
    }
}
// add new user
export const addNewUserRequest = (data) =>{
    return (dispatch) =>{
        return addNewUser(data)
        .then( res =>{
            // res.data.created
            dispatch( addUser(res.data.created) )
        } )
        .then( res =>{
            dispatch( open_dialog() )
        } )
        .then( res =>{
            dispatch( notiSnackbar("Complete!") )
        } )
        // .catch( err =>console.log(err) )
    }
}
export const addUser = (dataNewUser) =>{
    return{
        type: 'ADD_NEW_USER',
        dataNewUser
    }
}
export const open_dialog = () =>{
    return{
        type: 'OPEN_DIALOG'
    }
}
// delete data user
export const deleteUserRequest = (_id) =>{
    return (dispatch) =>{
        return deleteUser(_id) 
        .then( res =>{
            dispatch( removeUser(_id) )
        } )
        .then( res =>{
            dispatch( remove_user_to_list(_id) )
        } )
        .then( res =>{
            dispatch( notiSnackbar("Deleted!") )
        } )
    }
}
export const removeUser = (_id) => {
    return{
        type: "DELETE_ITEM",
        _id
    }
}
// export const removeIdFromSelectedAll = (_id) =>{
//     return{
//         type: "REMOVE_ID_WHILE_DELETED_USER", 
//         _id
//     }
// }
// delete list user
export const deleteListUser = (listUser) =>{
    return (dispatch) =>{
        listUser.map( (_id) =>{
            return deleteUser(_id)
            .then( res =>{
                dispatch( removeUser(_id) )
            } )
            .then( res =>{
                dispatch( notiSnackbar("Deleted user!") )
            } )
        } )
    }
}

//  notisnackbar 

export const notiSnackbar = (messenger) =>{
    return {
        type: "SHOW_MESSENGER",
        messenger
    }
}

export const set_page = (page) =>{
    return{
        type: 'SET_PAGE', 
        page
    };
};
export const set_row_per_page = (rowPerPage) =>{
    return{
        type: 'SET_ROW_PER_PAGE',
        rowPerPage
    }
}

export const edit_data_dialog = (dataItem) =>{
    return{
        type : 'EDIT_DATA_DIALOG',
        dataItem
    }
}
export const add_user_to_list = (_id) =>{
    return {
        type: "ADD_USER_TO_LIST",
        _id
    }
}
export const remove_user_to_list = (_id) =>{
    return {
        type: "REMOVE_USER_TO_LIST",
        _id
    }
}
export const set_order = (order) =>{
    return {
        type : 'SET_ORDER',
        order
    }
}
export const set_orderBy = (orderBy) =>{
    return {
        type : 'SET_ORDERBY',
        orderBy
    }
}
export const add_all_user_to_list = (listId) =>{
    return {
        type : "ADD_ALL_USER_TO_LIST",
        listId
    }
}
export const remove_all_user_to_list = () =>{
    return {
        type : "REMOVE_ALL_USER_TO_LIST",
    }
}
export const close_snackbar = () =>{
    return {
        type : "CLOSE_SNRACKBAR"
    }
}