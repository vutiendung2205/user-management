import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Portal from '@material-ui/core/Portal';
import { close_snackbar } from '../../Slice/SnackbarSlice';

const Notistack = () => {
    const dispatch = useDispatch();
    const snackbar = useSelector((state)=>state.snackbar)

    const handleClose = () => {
        dispatch( close_snackbar() )
    }
    const vertical = 'top';
    const horizontal= 'right';
    return (
        <Portal>
            <Snackbar
            severity="success"
            anchorOrigin={{ vertical, horizontal }}
            open={snackbar.open}
            onClose={handleClose}
            autoHideDuration={6000}
            message={snackbar.messenger}
            key={vertical + horizontal}
            />
        </Portal>
    )
}
export default Notistack;