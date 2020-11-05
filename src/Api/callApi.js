import axios from "axios";
import { URL } from "../constants";
import { addUser, editUser, getData, removeUser } from "../Slice/DataSlice";
import { open_dialog } from "../Slice/DialogSlice";
import { remove_user_to_list } from "../Slice/SelectAllSlice";
import { notiSnackbar } from "../Slice/SnackbarSlice";

//  get data user while start
export const getDataRequest = () =>{
    return (dispatch) =>{
        return getDataUser()
        .then( res =>{
            dispatch( getData(res.data) )
        } )
    }
}
//  get data user
export const getDataUser = () =>{
    return axios({
        url: URL,
        method : 'GET',
        data: null
    })
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
// edit data user
export const editDataUser = (user) =>{
    let editUser = {
        avatar: user.avatar,
        fistname: user.fistname,
        lastname: user.lastname,
        company: user.company,
        jobtitle: user.jobtitle,
        email: user.email,
        phone: user.phone
    }
    return axios({
        url: `${URL}/${user._id}`,
        method: "PATCH",
        data: editUser
    })
}
// delete list user
export const deleteListUser = (listUser) =>{
    return (dispatch) =>{
        listUser.map( (_id) =>{
            return dispatch( deleteUserRequest(_id) )
        } )
        
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
// delete data user
export const deleteUser = (_id) =>{
    return axios({
        url: `${URL}/${_id}`,
        method: 'DELETE',
        data: _id
    })
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
//  add new user
export const addNewUser = (data) =>{
    return axios({
        url : URL,
        method: 'POST',
        data
    })
}