import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { edit_data_dialog, open_dialog } from '../../Slice/DialogSlice';
import { deleteListUser } from '../../Api/callApi';
import { avatar } from '../../constants';


const EnhancedTableToolbar = (props) =>{
    const dispatch = useDispatch();
    const selectAll = useSelector( (state)=> state.selectAll )
    const handleDeleteListUser = () =>{
        dispatch( deleteListUser(selectAll) )
    }
    const handleAddNewUser = () =>{
        let dataItem = {
            _id: '',
            avatar: `${avatar[Math.floor(Math.random() * 6)]}`,
            fistname: '',
            lastname: '',
            company: '',
            jobtitle: '',
            email: '',
            phone: ''
        }
        dispatch( edit_data_dialog(dataItem) );
        dispatch( open_dialog() );
    }
    const classes = props.classes;
    const numSelected = selectAll.length;
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
                    <IconButton aria-label="delete" onClick={handleDeleteListUser}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Add new User">
                    <IconButton aria-label="Add new user" onClick={handleAddNewUser}>
                        <AddCircleOutlineOutlinedIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    )
}
export default compose(  withStyles(styles) )(EnhancedTableToolbar)