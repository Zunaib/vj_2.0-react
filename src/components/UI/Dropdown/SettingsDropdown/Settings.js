import React, { Component } from 'react';
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
                    <i class="fas fa-cog"
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
                    <MenuItem onClick={this.handleClose} >{"Edit"}</MenuItem>
                    <MenuItem onClick={this.handleClose} >{"Remove"}</MenuItem>
                </Menu>
            </div>
        );
    }
}



export default SimpleMenu;