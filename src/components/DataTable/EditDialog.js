import React, { Component } from 'react';
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
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import styles from './styles'
import { addNewUserRequest, editUserRequest, notiSnackbar, open_dialog } from '../../actions';
import { avatar } from '../commons/constants/index';

class EditDialog extends Component {
    constructor(props){
        super(props);
        this.state = {
            _id: '',
            avatar: '',
            fistname: '',
            lastname: '',
            company: '',
            jobtitle: '',
            email: '',
            phone: ''
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
    }
    componentDidMount(){
        this.setState({
            avatar: avatar[Math.floor(Math.random() * 6)]
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.dialog._id !== this.state._id){
            this.setState({
                _id: nextProps.dialog._id,
                avatar: nextProps.dialog._id !== '' ? nextProps.dialog.avatar : avatar[Math.floor(Math.random() * 6)],
                fistname: nextProps.dialog.fistname,
                lastname: nextProps.dialog.lastname,
                company: nextProps.dialog.company,
                jobtitle: nextProps.dialog.jobtitle,
                email: nextProps.dialog.email,
                phone: nextProps.dialog.phone
            })
        }
    }
    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleClose(){
        this.props.openDialog()
    }
    handleSubmitForm(){
        let dataUser = {
            avatar: this.state.avatar,
            fistname: this.state.fistname,
            lastname: this.state.lastname,
            company: this.state.company,
            jobtitle: this.state.jobtitle,
            email: this.state.email,
            phone: this.state.phone
        }
        if(Object.values(dataUser).map( value =>value.trim() ).indexOf('') === -1){
            if( this.state._id !== ''){
                // UPDATE DATA USER
                let user = {...this.state};
                this.props.editUser(user);
                this.props.openDialog();
                this.setState({
                    _id: '',
                    avatar: '',
                    fistname: '',
                    lastname: '',
                    company: '',
                    jobtitle: '',
                    email: '',
                    phone: ''
                })
            } else{
                // ADD NEW DATA USER;
                
                this.props.addNewUser(dataUser)
                this.setState({
                    _id: '',
                    avatar: '',
                    fistname: '',
                    lastname: '',
                    company: '',
                    jobtitle: '',
                    email: '',
                    phone: ''
                })
            }
        }else{
            this.setState({
                fistname: this.state.fistname.trim(),
                lastname: this.state.lastname.trim(),
                company: this.state.company.trim(),
                jobtitle: this.state.jobtitle.trim(),
                email: this.state.email.trim(),
                phone: this.state.phone.trim()
            })
        }
    }
    render() {
        const dialog = this.props.dialog;
        const classes = this.props.classes;
        return (
            <Dialog
                open={dialog.open}
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="max-width-dialog-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <div className={classes.headerDialog}>
                    <DialogTitle id='max-width-dialog-title' >{this.state._id !== '' ? "Edit" : "Add"} contact</DialogTitle>
                        <Avatar className={classes.avatarDialog} alt={`${dialog.fistname} ${dialog.lastname}`} src={this.state.avatar} />
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
                                error={this.state.fistname == ''}
                                required
                                id="outlined-required"
                                label="Fist name"
                                value={this.state.fistname}
                                variant="outlined"
                                name='fistname'
                                onChange={(e)=>this.handleChange(e)}
                                />}
                        />
                        <FormControlLabel
                            label={<AccountCircleOutlinedIcon />}
                            labelPlacement="start"
                            className={classes.formControlLabel}
                            control={<TextField
                                className={classes.textField}
                                error={this.state.lastname == ''}
                                required
                                name='lastname'
                                id="outlined-required"
                                label="Last name"
                                value={this.state.lastname}
                                variant="outlined"
                                onChange={(e)=>this.handleChange(e)}
                                />}
                        />
                        <FormControlLabel
                            label={<EmojiTransportationOutlinedIcon />}
                            labelPlacement="start"
                            className={classes.formControlLabel}
                            control={<TextField
                                className={classes.textField}
                                error={this.state.company == ''}
                                required
                                name='company'
                                id="outlined-required"
                                label="Company"
                                value={this.state.company}
                                variant="outlined"
                                onChange={(e)=>this.handleChange(e)}
                                />}
                        />
                        <FormControlLabel
                            label={<ListAltOutlinedIcon />}
                            labelPlacement="start"
                            className={classes.formControlLabel}
                            control={<TextField
                                className={classes.textField}
                                error={this.state.jobtitle == ''}
                                required
                                name='jobtitle'
                                id="outlined-required"
                                label="Job Title"
                                value={this.state.jobtitle}
                                variant="outlined"
                                onChange={(e)=>this.handleChange(e)}
                                />}
                        />
                        <FormControlLabel
                            label={<EmailOutlinedIcon />}
                            labelPlacement="start"
                            className={classes.formControlLabel}
                            control={<TextField
                                className={classes.textField}
                                error={this.state.email == ''}
                                required
                                name='email'
                                id="outlined-required"
                                label="Email"
                                value={this.state.email}
                                variant="outlined"
                                onChange={(e)=>this.handleChange(e)}
                                />}
                        />
                        <FormControlLabel
                            label={<PhoneAndroidOutlinedIcon />}
                            labelPlacement="start"
                            className={classes.formControlLabel}
                            control={<TextField
                                className={classes.textField}
                                error={this.state.phone == ''}
                                required
                                id="outlined-required"
                                label="Phone"
                                name='phone'
                                value={this.state.phone}
                                variant="outlined"
                                onChange={(e)=>this.handleChange(e)}
                                />}
                        />
                    </FormGroup>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button
                        onClick={this.handleSubmitForm}
                        color="primary"
                        variant="contained"
                    >
                        Save
                    </Button>
                    <Button
                        onClick={this.handleClose}
                        color="primary"
                    >
                        <DeleteIcon />
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        dialog : state.dialog
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        openDialog : () =>{
            dispatch( open_dialog() )
        },
        editUser : (user) =>{
            dispatch( editUserRequest(user) )
        },
        addNewUser : (dataUser) =>{
            dispatch( addNewUserRequest(dataUser) )
        },
        showSnackBar: () =>{
            dispatch( notiSnackbar("You must complete form before submit!") )
        }
    }
}
export default compose( connect(mapStateToProps,mapDispatchToProps), withStyles(styles) )(EditDialog);
