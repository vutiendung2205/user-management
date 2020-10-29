import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import EnhancedTableHead from './EnhancedTableHead'
import DataTableRow from './DataTableRow';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import styles from "./styles";
import EditDialog from './EditDialog';
import { getDataRequest, set_page, set_row_per_page } from '../../actions';
import Notistack from './Notistack';


class DataTable extends Component {
    constructor(props){
        super(props);
        this.state={
            order: 'asc',
            oderDir : 'fistname'
        }
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
    }
    componentDidMount(){
        this.props.getdataUser()
    }
    handleChangePage(e,newPage){
        this.props.setPage(newPage);
    }
    handleChangeRowsPerPage(e){
        this.props.setRowPerPage(e.target.value)
    }

    render() {
        const classes = this.props.classes;
        const data = this.props.data;
        return (
            <div className={classes.root} >
                <Paper > 
                    <EnhancedTableToolbar />
                    <TableContainer>
                        <Table >
                            <EnhancedTableHead />
                            <DataTableRow page={this.props.pagination.page} rowPerPage={this.props.pagination.rowPerPage} />
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={this.props.pagination.rowPerPage}
                        page={this.props.pagination.page}
                        onChangePage={(e,page)=>this.handleChangePage(e,page)}
                        onChangeRowsPerPage={(e)=>this.handleChangeRowsPerPage(e)}
                    />
                    <EditDialog />
                </Paper>
                <Notistack />
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        data        : state.data,
        pagination  : state.pagination
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        getdataUser : () =>{
            dispatch( getDataRequest() )
        },
        setPage : (page) =>{
            dispatch( set_page(page) )
        },
        setRowPerPage : (rowPerPage) =>{
            dispatch( set_row_per_page(rowPerPage) )
        }
    }
}
export default compose( connect(mapStateToProps,mapDispatchToProps), withStyles(styles) )(DataTable);