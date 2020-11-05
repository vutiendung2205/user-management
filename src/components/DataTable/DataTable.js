import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import EnhancedTableHead from './EnhancedTableHead'
import DataTableRow from './DataTableRow';
import {  useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import styles from "./styles";
import EditDialog from './EditDialog';
import Notistack from './Notistack';
import { set_page, set_row_per_page } from '../../Slice/PaginationSlice';
import { getDataRequest } from '../../Api/callApi';

const DataTable = (props) => {
    const dispatch = useDispatch();
    const data = useSelector( (state) => state.data );
    const pagination = useSelector( (state)=>state.pagination )
    useEffect(()=>{
        dispatch( getDataRequest() )
    },[])
    
    const handleChangePage = (e,newPage) => {
        dispatch( set_page(newPage) )
    }
    const handleChangeRowsPerPage = (e) => {
        dispatch( set_row_per_page(e.target.value) )
    }
    const classes = props.classes;
    return (
        <div className={classes.root} >
            <Paper > 
                <EnhancedTableToolbar />
                <TableContainer>
                    <Table >
                        <EnhancedTableHead />
                        <DataTableRow />
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={pagination.rowPerPage}
                    page={pagination.page}
                    onChangePage={(e,page)=>handleChangePage(e,page)}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                <EditDialog />
            </Paper>
            <Notistack />
        </div>
    )
}
export default compose(  withStyles(styles) )(DataTable);