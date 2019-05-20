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
                        <MenuItem onClick={this.handleClose}><i className="fas fa-home"></i>Dashboard</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/designer">
                        <MenuItem onClick={this.handleClose}><i className="fas fa-user"></i>Profile</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/usersettings">
                        <MenuItem onClick={this.handleClose}><i className="fas fa-user-cog"></i>Settings</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/customerorders">
                        <MenuItem onClick={this.handleClose}><i className="fab fa-first-order-alt"></i>My Placed Orders</MenuItem>
                    </NavLink>
                    <NavLink className={classes.LinkLogout} to="/logout">
                        <MenuItem onClick={this.handleClose}><i className={["fas fa-sign-out-alt", classes.back].join(' ')}></i>Logout</MenuItem>
                    </NavLink>

                </Menu>
            </div>
        );
    }
}


export default SimpleMenu;