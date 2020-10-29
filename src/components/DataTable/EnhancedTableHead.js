import React, { Component } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import styles from './styles'
import { add_user_to_list, remove_user_to_list, set_order, set_orderBy } from '../../actions';

class Thead extends Component {
    constructor(props){
        super(props);
        this.state = {
            headCells : [
                { id: 'avatar', numeric: false, disablePadding: true, label: '' },
                { id: 'fistname', numeric: false, disablePadding: false, label: 'Fist Name' },
                { id: 'lastname', numeric: false, disablePadding: false, label: 'Last name' },
                { id: 'company', numeric: false, disablePadding: false, label: 'Company' },
                { id: 'jobtitle', numeric: false, disablePadding: false, label: 'Job Title' },
                { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
                { id: 'phone', numeric: false, disablePadding: false, label: 'Phone' },
                { id: 'deleta', numeric: false, disablePadding: false, label: '' },
            ]
        }
        this.handleSort = this.handleSort.bind(this);
        this.onSelectAllClick = this.onSelectAllClick.bind(this);
    }
    onSelectAllClick(e){
        let listId= [];
        let page = this.props.pagination.page;
        let rowPerPage= this.props.pagination.rowPerPage;
        if(e.target.checked){
            this.props.data.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
            .map( (user)=>{
                if( this.props.selectAll.filter( id => id === user._id ).length === 0 ){
                    listId.push(user._id)
                }
            });
            this.props.addAllUserToList(listId)
        } else {
            this.props.removeAllUserToList()
        }
    }
    handleSort(id){
        const isAsc = this.props.sort.orderBy === id && this.props.sort.order === 'asc';
        this.props.setOrder( isAsc ? 'desc' : 'asc' )
        this.props.setOrderBy(id);
    }
    render() {
        const order = this.props.sort.order;
        const orderBy = this.props.sort.orderBy;
        const classes = this.props.classes;
        return (
            <TableHead className={classes.tableHead}>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            checked={this.props.selectAll.length>0 ? true : false}
                            onChange={(e)=>this.onSelectAllClick(e)}
                            inputProps={{ 'aria-label': 'select all desserts' }}
                        />
                    </TableCell>
                    {this.state.headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={ ()=>{this.handleSort(headCell.id)} }
                                
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
}
const mapStateToProps = (state) =>{
    return {
        data : state.data,
        sort : state.sort,
        selectAll : state.selectAll,
        pagination : state.pagination
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        setOrder : (order) =>{
            dispatch( set_order(order) )
        },
        setOrderBy : (orderBy) =>{
            dispatch( set_orderBy(orderBy) )
        },
        addAllUserToList : (listId) =>{
            dispatch( add_user_to_list(listId) )
        },
        removeAllUserToList : () =>{
            dispatch( remove_user_to_list() )
        }
    }
}
export default compose( connect(mapStateToProps,mapDispatchToProps), withStyles(styles) )(Thead);