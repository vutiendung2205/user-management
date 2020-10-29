import React, { Component } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import styles from './styles'
import { add_user_to_list, deleteUserRequest, edit_data_dialog, open_dialog, remove_user_to_list } from '../../actions';

class DataTableRow extends Component {
    constructor(props){
        super(props);

        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handleEditItem = this.handleEditItem.bind(this);
        this.onSelectAllClick = this.onSelectAllClick.bind(this);
    }
    handleDeleteItem(e,_id){
        e.stopPropagation();
        this.props.deleteItem(_id)
        this.props.removeUserToList(_id)
    }
    handleEditItem(e,dataItem){
        this.props.openDialog()
        this.props.editDialog(dataItem)
    }
    onSelectAllClick(e,_id){
        if(e.target.checked){
            this.props.addUserToList(_id)
        }else{
            this.props.removeUserToList(_id)
        }
    }
    render() {
        const classes = this.props.classes;
        const page = this.props.page;
        const rowPerPage= this.props.rowPerPage;
        const order = this.props.sort.order;
        const orderBy = this.props.sort.orderBy;
        return (
            <TableBody>
                {
                    this.props.data
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
                        let key = this.props.searchKey.toLowerCase();
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
                                    onChange={(e)=>this.onSelectAllClick(e,row._id)}
                                    checked={this.props.selectAll.filter( (_id) => _id === row._id ).length > 0}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </Tooltip>
                            </TableCell>
                            <TableCell onClick={(e)=>this.handleEditItem(e,row)} component="th" id={labelId} scope="row" padding="none">
                                <Avatar alt={`${row.fistname} ${row.lastname}`} src={row.avatar} />
                            </TableCell>
                            <TableCell onClick={(e)=>this.handleEditItem(e,row)} className={classes.tableRow} align="left">{row.fistname}</TableCell>
                            <TableCell onClick={(e)=>this.handleEditItem(e,row)} align="left">{row.lastname}</TableCell>
                            <TableCell onClick={(e)=>this.handleEditItem(e,row)} align="left">{row.company}</TableCell>
                            <TableCell onClick={(e)=>this.handleEditItem(e,row)} align="left">{row.jobtitle}</TableCell>
                            <TableCell onClick={(e)=>this.handleEditItem(e,row)} align="left">{row.email}</TableCell>
                            <TableCell onClick={(e)=>this.handleEditItem(e,row)} align="left">{row.phone}</TableCell>
                            <TableCell>
                                <Tooltip title="Delete">
                                        <Tooltip title="Delete">
                                            <IconButton aria-label="delete" onClick={(e)=>this.handleDeleteItem(e,row._id)}>
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
}
const mapStateToProps = (state) =>{
    return {
        data : state.data,
        searchKey : state.searchKey,
        sort : state.sort,
        selectAll : state.selectAll
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        deleteItem : (_id) =>{
            dispatch( deleteUserRequest(_id) )
        },
        openDialog : () =>{
            dispatch( open_dialog() )
        },
        editDialog : (dataItem) =>{
            dispatch( edit_data_dialog(dataItem) )
        },
        addUserToList: (_id) => {
            dispatch( add_user_to_list(_id) )
        },
        removeUserToList: (_id) => {
            dispatch( remove_user_to_list(_id) )
        }
    }
}
export default compose( connect(mapStateToProps,mapDispatchToProps), withStyles(styles) )(DataTableRow)