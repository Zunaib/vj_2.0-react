import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import classes from './Settings.css';


class SimpleMenu extends Component {
    state = {
        anchorEl: null
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;

        return (
            <div className={classes.Main}>
                <div onClick={this.handleClick}>
                    <h4>Settings</h4>
                    <i className="fas fa-cog"
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"

                    ></i>
                </div>
                <Menu
                    className={classes.Menu}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >

                    <NavLink to={this.props.editpath} activeClassName={classes.active}>
                        <MenuItem onClick={this.handleClose} className={classes.EditMenuItem} >
                            <h4>Edit</h4>
                            <i className="far fa-edit"></i>
                        </MenuItem>
                    </NavLink>
                    <div onClick={this.props.delete}>
                        <MenuItem onClick={this.handleClose} className={classes.RemoveMenuItem} >
                            <h4>Delete</h4>
                            <i className="fas fa-times"></i>
                        </MenuItem>
                    </div>
                </Menu>
            </div>
        );
    }
}


export default SimpleMenu;