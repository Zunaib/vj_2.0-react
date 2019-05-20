import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actions from '../../../Store/Actions/index';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import display from '../../../assets/images/defaultuserimage.png';
// import Button from '../../UI/Button/Button';
import Dropdown from '../../UI/Dropdown/Dropdown';

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
                <ul className={classes.NavigationItemsLanding}>
                    <NavigationItem navitemType="Landing" link="#about" clicked={this.props.scrollAbout}>About</NavigationItem>
                    <NavigationItem navitemType="Landing" link="#mission" clicked={this.props.scrollMission}>Mission</NavigationItem>
                    <NavigationItem navitemType="Landing" Type="NavButton" link="/login">Sign In</NavigationItem>
                    <NavigationItem navitemType="Landing" Type="NavButton" link="/signup">Sign Up</NavigationItem>
                </ul>
            );
        } else if (this.props.Type === "Web") {
            navitems = (
                <ul className={classes.NavigationItemsWeb}>

                    <div className={classes.MessageIcon} >
                        <i className="fas fa-inbox">
                            <span className={classes.Badge}>3</span>
                        </i>
                    </div>
                    <div className={classes.NotificationIcon} >
                        <i className="fas fa-bell">
                            <span className={classes.Badge}>3</span>
                        </i>
                    </div>

                    <div className={classes.ImageButton} >
                        <h5>{firstname ? firstname + " " + lastname : 'Name'}</h5>
                        <img className={classes.Image} src={img} alt="NavDisplay" />
                        <div className={classes.Dropdown} >
                            <Dropdown />
                        </div>

                    </div>


                </ul>
            );
        }

        return (
            <div className={classes.Container}>
                {navitems}
            </div>
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
