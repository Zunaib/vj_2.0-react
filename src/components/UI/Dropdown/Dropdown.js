import React, { Component } from 'react';
import Auxilary from '../../../hoc/Auxilary/Auxilary'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index';
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

    toCustomer = () => {
        console.log('to cust')
        this.props.changetoCustomer(this.props.token)
    }

    toCreator = () => {
        console.log('to crea')

        this.props.changetoCreator(this.props.token)
    }
    render() {
        const { anchorEl } = this.state;

        let dropitems = null;
        if (this.props.isCreator === "true") {
            dropitems = (
                <Auxilary>
                    <NavLink className={classes.Link} to="/dashboard/designer">
                        <MenuItem onClick={this.handleClose}><i className="fas fa-toggle-on"></i>Active: Creator</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/designer">
                        <MenuItem onClick={this.handleClose}><i className="fas fa-user"></i>Profile</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/usersettings">
                        <MenuItem onClick={this.handleClose}><i className="fas fa-user-cog"></i>Settings</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard" onClick={this.toCustomer}>
                        <MenuItem onClick={this.handleClose}><i className="fas fa-retweet"></i>Shift To Customer</MenuItem>
                    </NavLink>
                    <NavLink className={classes.LinkLogout} to="/logout">
                        <MenuItem onClick={this.handleClose}><i className={["fas fa-sign-out-alt", classes.back].join(' ')}></i>Logout</MenuItem>
                    </NavLink>
                </Auxilary>
            );
        } else {
            dropitems = (
                <Auxilary>
                    <NavLink className={classes.Link} to="/dashboard">
                        <MenuItem onClick={this.handleClose}><i className="fas fa-toggle-on"></i>Active: Customer</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard">
                        <MenuItem onClick={this.handleClose}><i className="fas fa-home"></i>Dashboard</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/usersettings">
                        <MenuItem onClick={this.handleClose}><i className="fas fa-user-cog"></i>Settings</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/customerorders">
                        <MenuItem onClick={this.handleClose}><i className="fab fa-first-order-alt"></i>My Placed Orders</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/designer" onClick={this.toCreator}>
                        <MenuItem onClick={this.handleClose}><i className="fas fa-retweet"></i>Shift To Creator</MenuItem>
                    </NavLink>
                    <NavLink className={classes.LinkLogout} to="/logout">
                        <MenuItem onClick={this.handleClose}><i className={["fas fa-sign-out-alt", classes.back].join(' ')}></i>SignOut</MenuItem>
                    </NavLink>
                </Auxilary>
            );
        }


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

                    {dropitems}

                </Menu>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.Auth.token,
        isCreator: state.Auth.creator,
        firstTimeLogin: state.Auth.firstTimeLogin
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changetoCustomer: (token) => dispatch(actions.UseAsCustomer(token)),
        changetoCreator: (token) => dispatch(actions.UseAsCreator(token)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SimpleMenu);
