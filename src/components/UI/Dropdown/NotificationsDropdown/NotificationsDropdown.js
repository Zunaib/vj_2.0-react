import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../Store/Actions/index';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import classes from './NotificationsDropdown.css';
// import display from '../../../../assets/images/defaultuserimage.png';

class SimpleMenu extends Component {
    state = {
        anchorEl: null,
        notifications: null
    };

    componentDidMount() {
        this.props.fetchnotifications(this.props.token)

    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.notifications !== prevState.notifications) {
            return { notifications: nextProps.notifications };
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.notifications !== this.props.notifications) {
            //Perform some operation here
            this.setState({ notifications: this.props.notifications });
        }
    }


    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
        this.props.fetchnotifications(this.props.token)
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
        console.log(this.state.notifications)

        let badge = null;
        let notifications = (
            <NavLink className={classes.Link} to="/dashboard">
                <hr className={classes.Line}></hr>
                <MenuItem onClick={this.handleClose} className={classes.Image}>
                    <p>No Notifications Yet</p>
                </MenuItem>
                <hr className={classes.Line}></hr>
            </NavLink>
        );
        if (this.state.notifications) {
            if (this.state.notifications.isRead === false) {
                badge = <span className={classes.Badge}></span>;
            }
            let icon = null;
            let path = null;
            if (this.state.notifications.notification.length > 0) {
                notifications = (this.state.notifications.notification.map(notification => {
                    if (notification.notficationType === "comment") {
                        icon = <i className="fas fa-comment"></i>
                    } else if (notification.notficationType === "like") {
                        icon = <i className="fas fa-thumbs-up"></i>
                    } else if (notification.notficationType === "customerOrder") {
                        icon = <i className="fas fa-list-ol"></i>
                    } else if (notification.notficationType === "designerOrder") {
                        icon = <i className="fas fa-list-ol"></i>
                    }

                    if (notification.contentType === "product") {
                        path = "/dashboard/products/" + notification.contentId;
                    } else if (notification.contentType === "vlog") {
                        path = "/dashboard/vlogs/" + notification.contentId;
                    } else if (notification.contentType === "blog") {
                        path = "/dashboard/blogs/" + notification.contentId;
                    } else if (notification.contentType === "customerOrder") {
                        path = "/dashboard/customerorders";
                    } else if (notification.contentType === "designerOrder") {
                        path = "/dashboard/designerorders";
                    }


                    return <NavLink className={classes.Link} to={path} key={notification._id}>
                        <hr className={classes.Line}></hr>
                        <MenuItem onClick={this.handleClose} className={classes.SingleNot}>
                            {icon}
                            <p>{notification.text}</p>
                        </MenuItem>
                        <hr className={classes.Line}></hr>
                    </NavLink>
                })
                );
            }
        } else {
            badge = null;
        }

        return (
            <div className={classes.Main}>
                <i className="fas fa-bell"
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    {badge}
                </i>

                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >

                    {/* {dropitems} */}

                    <MenuItem className={classes.NotHead}>
                        <h2>Notifications</h2>
                    </MenuItem>


                    {notifications}

                </Menu>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.Auth.token,
        unreadNot: state.UserSettings.settings[0].notifications.isRead,
        notifications: state.FetchNotifications.notifications,
        isCreator: state.Auth.creator,
        firstTimeLogin: state.Auth.firstTimeLogin
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changetoCustomer: (token) => dispatch(actions.UseAsCustomer(token)),
        changetoCreator: (token) => dispatch(actions.UseAsCreator(token)),
        fetchnotifications: (token) => dispatch(actions.FetchNotifications(token)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SimpleMenu);
