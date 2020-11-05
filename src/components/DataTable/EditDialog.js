import React, { Component, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import EmojiTransportationOutlinedIcon from '@material-ui/icons/EmojiTransportationOutlined';
import PhoneAndroidOutlinedIcon from '@material-ui/icons/PhoneAndroidOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import { open_dialog } from '../../Slice/DialogSlice';
import { addNewUserRequest, editUserRequest } from '../../Api/callApi';
import { avatar } from '../../constants';

const EditDialog = (props) => {
    const dispatch = useDispatch();
    const dialog = useSelector( (state)=>state.dialog);
    const classes = props.classes;
    const [user_info, setUser_info] = useState({
        _id: '',
        avatar: '',
        fistname: '',
        lastname: '',
        company: '',
        jobtitle: '',
        email: '',
        phone: ''
    })
    useEffect(() => {
        if(dialog._id !== user_info._id || dialog._id ==="" ){
            setUser_info({
                _id: dialog._id,
                avatar: dialog._id !== '' ? dialog.avatar : avatar[Math.floor(Math.random() * 6)],
                fistname: dialog.fistname,
                lastname: dialog.lastname,
                company: dialog.company,
                jobtitle: dialog.jobtitle,
                email: dialog.email,
                phone: dialog.phone
            })
        }
    }, [dialog._id])

    const handleChange = (e) =>{
        setUser_info({...user_info,[e.target.name] : e.target.value})
    }
    const handleClose = () => {
        dispatch( open_dialog() )
        setUser_info({
            _id: '',
            avatar: avatar[Math.floor(Math.random() * 6)],
            fistname: '',
            lastname: '',
            company: '',
            jobtitle: '',
            email: '',
            phone: ''
        })
    }
    const handleSubmitForm = () => {
        let dataUser = {
            avatar: user_info.avatar,
            fistname: user_info.fistname,
            lastname: user_info.lastname,
            company: user_info.company,
            jobtitle: user_info.jobtitle,
            email: user_info.email,
            phone: user_info.phone
        }
        if(Object.values(dataUser).map( value =>value.trim() ).indexOf('') === -1){
            if( user_info._id !== ''){
                // UPDATE DATA USER
                let user = {...user_info};
                dispatch( editUserRequest(user) )
                dispatch( open_dialog() )
                setUser_info({
                    _id: '',
                    avatar: avatar[Math.floor(Math.random() * 6)],
                    fistname: '',
                    lastname: '',
                    company: '',
                    jobtitle: '',
                    email: '',
                    phone: ''
                })
            } else{
                // ADD NEW DATA USER;
                dispatch( addNewUserRequest(dataUser) );
                setUser_info({
                    _id: '',
                    avatar: avatar[Math.floor(Math.random() * 6)],
                    fistname: '',
                    lastname: '',
                    company: '',
                    jobtitle: '',
                    email: '',
                    phone: ''
                })
            }
        }else{
            setUser_info({...user_info,
                fistname: user_info.fistname.trim(),
                lastname: user_info.lastname.trim(),
                company: user_info.company.trim(),
                jobtitle: user_info.jobtitle.trim(),
                email: user_info.email.trim(),
                phone: user_info.phone.trim()
            })
        }
    }
    return(
        <Dialog
            open={dialog.open}
            keepMounted
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <div className={classes.headerDialog}>
                <DialogTitle id='max-width-dialog-title' >{user_info._id !== '' ? "Edit" : "Add"} contact</DialogTitle>
                    <Avatar className={classes.avatarDialog} alt={`${dialog.fistname} ${dialog.lastname}`} src={user_info.avatar} />
                <DialogTitle className={classes.fullnameDialog}  >{`${dialog.fistname} ${dialog.lastname}`}</DialogTitle>
            </div>
            <DialogContent>
                <FormGroup >
                    <FormControlLabel
                        label={<AccountCircleOutlinedIcon />}
                        labelPlacement="start"
                        className={classes.formControlLabel}
                        control={<TextField
                            className={classes.textField}
                            error={user_info.fistname == ''}
                            required
                            id="outlined-required"
                            label="Fist name"
                            value={user_info.fistname}
                            variant="outlined"
                            name='fistname'
                            onChange={(e)=>handleChange(e)}
                            />}
                    />
                    <FormControlLabel
                        label={<AccountCircleOutlinedIcon />}
                        labelPlacement="start"
                        className={classes.formControlLabel}
                        control={<TextField
                            className={classes.textField}
                            error={user_info.lastname == ''}
                            required
                            name='lastname'
                            id="outlined-required"
                            label="Last name"
                            value={user_info.lastname}
                            variant="outlined"
                            onChange={(e)=>handleChange(e)}
                            />}
                    />
                    <FormControlLabel
                        label={<EmojiTransportationOutlinedIcon />}
                        labelPlacement="start"
                        className={classes.formControlLabel}
                        control={<TextField
                            className={classes.textField}
                            error={user_info.company == ''}
                            required
                            name='company'
                            id="outlined-required"
                            label="Company"
                            value={user_info.company}
                            variant="outlined"
                            onChange={(e)=>handleChange(e)}
                            />}
                    />
                    <FormControlLabel
                        label={<ListAltOutlinedIcon />}
                        labelPlacement="start"
                        className={classes.formControlLabel}
                        control={<TextField
                            className={classes.textField}
                            error={user_info.jobtitle == ''}
                            required
                            name='jobtitle'
                            id="outlined-required"
                            label="Job Title"
                            value={user_info.jobtitle}
                            variant="outlined"
                            onChange={(e)=>handleChange(e)}
                            />}
                    />
                    <FormControlLabel
                        label={<EmailOutlinedIcon />}
                        labelPlacement="start"
                        className={classes.formControlLabel}
                        control={<TextField
                            className={classes.textField}
                            error={user_info.email == ''}
                            required
                            name='email'
                            id="outlined-required"
                            label="Email"
                            value={user_info.email}
                            variant="outlined"
                            onChange={(e)=>handleChange(e)}
                            />}
                    />
                    <FormControlLabel
                        label={<PhoneAndroidOutlinedIcon />}
                        labelPlacement="start"
                        className={classes.formControlLabel}
                        control={<TextField
                            className={classes.textField}
                            error={user_info.phone == ''}
                            required
                            id="outlined-required"
                            label="Phone"
                            name='phone'
                            value={user_info.phone}
                            variant="outlined"
                            onChange={(e)=>handleChange(e)}
                            />}
                    />
                </FormGroup>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Button
                    onClick={handleSubmitForm}
                    color="primary"
                    variant="contained"
                >
                    Save
                </Button>
                <Button
                    onClick={handleClose}
                    color="primary"
                >
                    <DeleteIcon />
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default compose(  withStyles(styles) )(EditDialog);