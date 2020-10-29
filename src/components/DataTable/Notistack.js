import { connect } from 'react-redux';
import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import Portal from '@material-ui/core/Portal';
import styles from './styles';
import { close_snackbar } from '../../actions';

class Notistack extends Component {
    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClose(){
        this.props.openSnackbar()
    }
    render() {
        const vertical = 'top';
        const horizontal= 'right';
        return (
            <Portal>
                <Snackbar
                severity="success"
                anchorOrigin={{ vertical, horizontal }}
                open={this.props.snackbar.open}
                onClose={this.handleClose}
                autoHideDuration={6000}
                message={this.props.snackbar.messenger}
                key={vertical + horizontal}
                />
            </Portal>
            
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        snackbar : state.snackbar
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        openSnackbar : () =>{
            dispatch( close_snackbar() )
        }
    }
}
export default compose(connect( mapStateToProps,mapDispatchToProps), withStyles(styles)  ) (Notistack);