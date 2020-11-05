import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import { set_order, set_orderBy } from '../../Slice/SortSlice';
import { add_all_user_to_list, remove_all_user_to_list } from '../../Slice/SelectAllSlice';

const Thead = (props) =>{
    const headCells = [
        { id: 'avatar', numeric: false, disablePadding: true, label: '' },
        { id: 'fistname', numeric: false, disablePadding: false, label: 'Fist Name' },
        { id: 'lastname', numeric: false, disablePadding: false, label: 'Last name' },
        { id: 'company', numeric: false, disablePadding: false, label: 'Company' },
        { id: 'jobtitle', numeric: false, disablePadding: false, label: 'Job Title' },
        { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
        { id: 'phone', numeric: false, disablePadding: false, label: 'Phone' },
        { id: 'deleta', numeric: false, disablePadding: false, label: '' },
    ];
    const { data, sort, selectAll, pagination } = useSelector( (state)=> state );
    const dispatch = useDispatch()
    const onSelectAllClick = (e) => {
        let listId= [];
        let page = pagination.page;
        let rowPerPage= pagination.rowPerPage;
        if(e.target.checked){
            data.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
            .map( (user)=>{
                if( selectAll.filter( id => id === user._id ).length === 0 ){
                    listId.push(user._id)
                }
            });
            dispatch( add_all_user_to_list(listId) );
        } else {
            dispatch( remove_all_user_to_list() );
        }
    }
    const handleSort = (id) =>{
        const isAsc = sort.orderBy === id && sort.order === 'asc';
        dispatch( set_order(isAsc ? 'desc' : 'asc') );
        dispatch( set_orderBy(id) );
    }
    const order = sort.order;
    const orderBy = sort.orderBy;
    const classes = props.classes;
    return (
        <TableHead className={classes.tableHead}>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={selectAll.length>0 ? true : false}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={ ()=>handleSort(headCell.id) }
                            
                        >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                            <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </span>
                        ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}
export default compose(  withStyles(styles) )(Thead);