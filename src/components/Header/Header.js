import React from 'react';
import { withStyles } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import styles from './styles'
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { searchData } from '../../Slice/searchSlice';

const Header = (props) =>{
    const dispatch = useDispatch();
    const handleSearch = (e) =>{
        let searchKey = e.target.value
        dispatch( searchData(searchKey) )
    }
    const classes = props.classes;
    return (
        <AppBar position="static" className={classes.appbar}>
            <Toolbar>
                <ButtonGroup className={classes.btnGroup}>
                    <span> <SearchOutlinedIcon /> </span>
                    <Input onChange={handleSearch} className={classes.search} placeholder="Search..." type="text" />
                </ButtonGroup>
            </Toolbar>
        </AppBar>
    )
}
export default compose(  withStyles(styles) )(Header);
