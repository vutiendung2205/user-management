import axios from "axios"
import { URL } from "../commons/constants/index"


//  get data user
export const getDataUser = () =>{
    return axios({
        url: URL,
        method : 'GET',
        data: null
    })
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


// delete data user
export const deleteUser = (_id) =>{
    return axios({
        url: `${URL}/${_id}`,
        method: 'DELETE',
        data: _id
    })
}


//  add new user
export const addNewUser = (data) =>{
    return axios({
        url : URL,
        method: 'POST',
        data
    })
}