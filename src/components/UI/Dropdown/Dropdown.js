import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import classes from './Dropdown.css';


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
                <i className="fas fa-sort-down"
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                ></i>

                <Menu
                    className={classes.Menu}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >

                    <NavLink className={classes.Link} to="/dashboard">
                        <MenuItem onClick={this.handleClose}>Dashboard</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/designer">
                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/usersettings">
                        <MenuItem onClick={this.handleClose}>Settings</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/customerorders">
                        <MenuItem onClick={this.handleClose}>Orders</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/logout">
                        <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                    </NavLink>

                </Menu>
            </div>
        );
    }
}


export default SimpleMenu;