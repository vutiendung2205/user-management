import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import styles from './styles'
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { deleteListUser, edit_data_dialog, open_dialog, remove_user_to_list } from '../../actions';

class EnhancedTableToolbar extends Component {
    constructor(props){
        super(props);
        this.handleDeleteListUser = this.handleDeleteListUser.bind(this);
        this.handleAddNewUser = this.handleAddNewUser.bind(this)
    }

    handleDeleteListUser(){
        this.props.deleteListUsers(this.props.selectAll);
        this.props.removeAllUserToList()
    };
    handleAddNewUser(){
        this.props.openDialog();
        this.props.removeDataUserFormDialog()
    }
    render() {
        const classes = this.props.classes;
        const numSelected = this.props.selectAll.length;
        return (
            <Toolbar className={numSelected > 0? classes.highlight : classes.nomal} >
                {numSelected > 0 ? (
                    <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                    </Typography>
                ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    List user
                    </Typography>
                )}

                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete" onClick={this.handleDeleteListUser}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Add new User">
                        <IconButton aria-label="Add new user" onClick={this.handleAddNewUser}>
                            <AddCircleOutlineOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        selectAll : state.selectAll
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        deleteListUsers : (listUser) => {
            dispatch( deleteListUser(listUser) )
        },
        removeAllUserToList : () =>{
            dispatch( remove_user_to_list() )
        },
        openDialog : () =>{
            dispatch( open_dialog() )
        },
        removeDataUserFormDialog : () =>{
            let dataItem = {
                _id: '',
                avatar: '',
                fistname: '',
                lastname: '',
                company: '',
                jobtitle: '',
                email: '',
                phone: ''
            }
            dispatch( edit_data_dialog(dataItem) )
        }
    }
}
export default compose( connect(mapStateToProps,mapDispatchToProps), withStyles(styles) )(EnhancedTableToolbar)