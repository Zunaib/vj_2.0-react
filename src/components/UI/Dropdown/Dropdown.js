import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import classes from './Dropdown.css';
import Auxilary from '../../../hoc/Auxilary/Auxilary';


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

    flagtodesigner = () => {
        console.log('shift flag to flagtodesigner')
        this.props.changeflagtodesigner(this.props.token)
    }
    flagtovlogger = () => {
        console.log('shift flag to flagtovlogger')
        this.props.changeflagtovlogger(this.props.token)
    }
    flagtoblogger = () => {
        console.log('shift flag to flagtoblogger')
        this.props.changeflagtoblogger(this.props.token)
    }
    flagtocustomer = () => {
        console.log('shift flag to flagtocustomer')
        this.props.changeflagtocustomer(this.props.token)
    }


    render() {
        const { anchorEl } = this.state;

        let list = null;
        if (this.props.flag === 'Blogger') {
            list = (
                <Auxilary>
                    <MenuItem onClick={this.handleClose} >{"Using As Blogger"}</MenuItem>
                    <NavLink to="/dashboard/designer" activeClassName={classes.active} onClick={this.flagtodesigner}>
                        <MenuItem onClick={this.handleClose} >Use As Designer</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/vlogger" onClick={this.flagtovlogger}>
                        <MenuItem onClick={this.handleClose}>Use As Vlogger</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard" onClick={this.flagtocustomer}>
                        <MenuItem onClick={this.handleClose}>Use As Customer</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/blogger">
                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/usersettings">
                        <MenuItem onClick={this.handleClose}>Settings</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/logout">
                        <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                    </NavLink>
                </Auxilary>
            )
        } else if (this.props.flag === 'Vlogger') {
            list = (
                <Auxilary>
                    <MenuItem onClick={this.handleClose} >{"Using As Vlogger"}</MenuItem>
                    <NavLink to="/dashboard/designer" activeClassName={classes.active} onClick={this.flagtodesigner}>
                        <MenuItem onClick={this.handleClose} >Use As Designer</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard" onClick={this.flagtocustomer}>
                        <MenuItem onClick={this.handleClose}>Use As Customer</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/blogger" onClick={this.flagtoblogger}>
                        <MenuItem onClick={this.handleClose}>Use As Blogger</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/vlogger">
                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/usersettings">
                        <MenuItem onClick={this.handleClose}>Settings</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/logout">
                        <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                    </NavLink>
                </Auxilary>
            )
        } else if (this.props.flag === 'Designer') {
            list = (
                <Auxilary>
                    <MenuItem onClick={this.handleClose} >{"Using As Designer"}</MenuItem>
                    <NavLink to="/dashboard" activeClassName={classes.active} onClick={this.flagtocustomer}>
                        <MenuItem onClick={this.handleClose} >Use As Customer</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/vlogger" onClick={this.flagtovlogger}>
                        <MenuItem onClick={this.handleClose}>Use As Vlogger</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/blogger" onClick={this.flagtoblogger}>
                        <MenuItem onClick={this.handleClose}>Use As Blogger</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/designer">
                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/usersettings">
                        <MenuItem onClick={this.handleClose}>Settings</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/logout">
                        <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                    </NavLink>
                </Auxilary>
            )
        } else if (this.props.flag === 'Customer') {
            list = (
                <Auxilary>
                    <MenuItem onClick={this.handleClose} >{"Using As Customer"}</MenuItem>
                    <NavLink to="/dashboard/designer" activeClassName={classes.active} onClick={this.flagtodesigner}>
                        <MenuItem onClick={this.handleClose} >Use As Designer</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/vlogger" onClick={this.flagtovlogger}>
                        <MenuItem onClick={this.handleClose}>Use As Vlogger</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/blogger" onClick={this.flagtoblogger}>
                        <MenuItem onClick={this.handleClose}>Use As Blogger</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard">
                        <MenuItem onClick={this.handleClose}>Dashboard</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/dashboard/usersettings">
                        <MenuItem onClick={this.handleClose}>Settings</MenuItem>
                    </NavLink>
                    <NavLink className={classes.Link} to="/logout">
                        <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                    </NavLink>
                </Auxilary>
            )
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
                    {list}
                </Menu>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        token: state.Auth.token,
        flag: state.Auth.flag
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeflagtodesigner: (token) => dispatch(actions.UpdateFlagToDesigner(token)),
        changeflagtovlogger: (token) => dispatch(actions.UpdateFlagToVlogger(token)),
        changeflagtoblogger: (token) => dispatch(actions.UpdateFlagToBlogger(token)),
        changeflagtocustomer: (token) => dispatch(actions.UpdateFlagToCustomer(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleMenu);