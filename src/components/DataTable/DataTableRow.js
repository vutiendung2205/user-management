import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import { add_user_to_list, remove_user_to_list } from '../../Slice/SelectAllSlice';
import { edit_data_dialog, open_dialog } from '../../Slice/DialogSlice';
import { deleteUserRequest } from '../../Api/callApi';

const DataTableRow = (props) => {
    const { data, searchKey, sort, selectAll,pagination  } = useSelector( (state) =>state );
    const dispatch = useDispatch();
    const handleEditItem = (e,dataItem) =>{
        dispatch( open_dialog() );
        dispatch( edit_data_dialog(dataItem) );
    }
    const onSelectAllClick = (e,_id) =>{
        if(e.target.checked){
            dispatch( add_user_to_list(_id) )
        }else{
            dispatch( remove_user_to_list(_id) )
        }
    };
    const handleDeleteItem = (e,_id) => {
        e.stopPropagation();
        dispatch( deleteUserRequest(_id) );
        dispatch( remove_user_to_list(_id) );
    }
    const classes = props.classes;
    const page = pagination.page;
    const rowPerPage= pagination.rowPerPage;
    const order = sort.order;
    const orderBy = sort.orderBy;
    return(
        <TableBody>
            {
                data
                .filter( row =>{
                    let item = [
                        row.fistname,
                        row.lastname,
                        row.company,
                        row.jobtitle,
                        row.phone,
                        row.email
                    ];
                    let flag = false;
                    let key = searchKey.toLowerCase();
                    for(var i = 0; i<item.length;i++){
                        if( item[i].toLowerCase().indexOf(key) !== -1 ){
                            flag = true;
                            break;
                        }
                    }
                    if(flag){
                        return row
                    }
                } )
                .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                .sort( (a,b)=>{
                    if( order === 'asc'){
                        if( a[orderBy].toLowerCase() >= b[orderBy].toLowerCase() ){
                            return 1
                        }else{
                            return -1
                        }
                    }else{
                        if( a[orderBy].toLowerCase() > b[orderBy].toLowerCase() ){
                            return -1
                        }else{
                            return 1
                        }
                    }
                } )
                .map((row, index) => { 
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                    <TableRow
                    className={classes.tableRow}
                    hover
                    role="checkbox" 
                    tabIndex={-1}
                    key={row._id} 
                    >
                        <TableCell padding="checkbox">
                            <Tooltip title="Select">
                                <Checkbox
                                aria-label="Select"
                                className={classes.checkbox}
                                onChange={(e)=>onSelectAllClick(e,row._id)}
                                checked={selectAll.filter( (_id) => _id === row._id ).length > 0}
                                inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </Tooltip>
                        </TableCell>
                        <TableCell onClick={(e)=>handleEditItem(e,row)} component="th" id={labelId} scope="row" padding="none">
                            <Avatar alt={`${row.fistname} ${row.lastname}`} src={row.avatar} />
                        </TableCell>
                        <TableCell onClick={(e)=>handleEditItem(e,row)} className={classes.tableRow} align="left">{row.fistname}</TableCell>
                        <TableCell onClick={(e)=>handleEditItem(e,row)} align="left">{row.lastname}</TableCell>
                        <TableCell onClick={(e)=>handleEditItem(e,row)} align="left">{row.company}</TableCell>
                        <TableCell onClick={(e)=>handleEditItem(e,row)} align="left">{row.jobtitle}</TableCell>
                        <TableCell onClick={(e)=>handleEditItem(e,row)} align="left">{row.email}</TableCell>
                        <TableCell onClick={(e)=>handleEditItem(e,row)} align="left">{row.phone}</TableCell>
                        <TableCell>
                            <Tooltip title="Delete">
                                    <Tooltip title="Delete">
                                        <IconButton aria-label="delete" onClick={(e)=>handleDeleteItem(e,row._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                );
                })}
        </TableBody>
    )
}
export default compose(  withStyles(styles) )(DataTableRow)