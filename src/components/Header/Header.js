import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import styles from './styles'
import { compose } from 'redux';
import { connect } from 'react-redux';

class Header extends Component {

    handleSearch(e){
        this.props.searchData(e.target.value)
    }
    render() {
        const classes = this.props.classes;
        return (
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <ButtonGroup className={classes.btnGroup}>
                        <span> <SearchOutlinedIcon /> </span>
                        <Input onChange={ (e) =>this.handleSearch(e)} className={classes.search} placeholder="Search..." type="text" />
                    </ButtonGroup>
                </Toolbar>
            </AppBar>
        )
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        searchData : (searchKey) =>{
            dispatch({
                type: 'SEARCH_DATA',
                searchKey
            })
        }
    }
}
export default compose( connect(null, mapDispatchToProps), withStyles(styles) )(Header);
