import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
// import * as actions from '../../../Store/Actions/index';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import display from '../../../assets/images/defaultuserimage.png';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Dropdown from '../../UI/Dropdown/Dropdown';
import NotificDropdown from '../../UI/Dropdown/NotificationsDropdown/NotificationsDropdown';

class NavigationItems extends Component {

    state = {
        userimage: '',
        userfirst: '',
        userlast: ''
    }


    componentDidMount = () => {
        let user = this.props.settings[0];
        if (user) {
            this.setState({
                userimage: user.displayPicture,
                userfirst: user.firstName,
                userlast: user.lastName
            })
        }
    }


    render() {

        let img = display;
        let firstname = this.state.userfirst;
        let lastname = this.state.userlast;
        if (this.state.userimage) {
            img = 'http://localhost:5000' + this.state.userimage;
        }


        let navitems = null;
        if (this.props.Type === "Landing") {
            navitems = (
                <div className={classes.Container}>

                    <ul className={classes.NavigationItemsLanding}>
                        <NavigationItem navitemType="Landing" link="#about" clicked={this.props.scrollAbout}>About</NavigationItem>
                        <NavigationItem navitemType="Landing" link="#mission" clicked={this.props.scrollMission}>Mission</NavigationItem>
                        <NavigationItem navitemType="Landing" Type="NavButton" link="/login">Sign In</NavigationItem>
                        <NavigationItem navitemType="Landing" Type="NavButton" link="/signup">Sign Up</NavigationItem>
                        {/* <div className={classes.Fb}>
                            <i className="fab fa-facebook-f"></i>
                        </div>
                        <div className={classes.Google}>
                            <i className="fab fa-google"></i>
                        </div> */}
                    </ul>
                </div>
            );
        } else if (this.props.Type === "Web") {
            navitems = (
                <div className={classes.ContainerWeb}>

                    <ul className={classes.NavigationItemsWeb}>

                        <div className={classes.MessageIcon} >
                            {/* <MsgDropdown /> */}
                            <NavLink to="/dashboard/messenger/convos" >
                                <i className="fas fa-inbox"
                                >
                                    <span className={classes.Badge}>3</span>
                                </i>
                            </NavLink>
                        </div>
                        <div className={classes.NotificationIcon} >
                            <NotificDropdown />
                        </div>

                        <div className={classes.ImageButton} >
                            <h5>{firstname ? firstname + " " + lastname : 'Name'}</h5>
                            <img className={classes.Image} src={img} alt="NavDisplay" />
                            <div className={classes.Dropdown} >
                                <Dropdown />
                            </div>

                        </div>


                    </ul>
                </div>
            );
        }

        return (
            <Auxilary>
                {navitems}
            </Auxilary>
        );
    }
};

const mapStateToProps = state => {
    return {
        settings: state.UserSettings.settings,
        token: state.Auth.token,
        flag: state.Auth.flag
    }
}

export default connect(mapStateToProps, null)(NavigationItems);
