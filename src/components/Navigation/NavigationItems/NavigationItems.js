import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index';
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


    componentWillMount = () => {
        if (this.props.token) {
            this.props.onfetchsettings(this.props.token);
        }
        setTimeout(() => {
            let user = this.props.settings[0];
            this.setState({
                userimage: user.displayPicture,
                userfirst: user.firstName,
                userlast: user.lastName
            })
        }, 50)
    }


    render() {

        let img = null;
        let firstname = this.state.userfirst;
        let lastname = this.state.userlast;
        if (this.state.userimage) {
            img = 'http://localhost:5000' + this.state.userimage;
        } else {
            img = display;
        }


        let navitems = null;
        if (this.props.Type === "Landing") {
            navitems = (
                <ul className={classes.NavigationItemsLanding}>
                    <NavigationItem navitemType="Landing" link="/">About</NavigationItem>
                    <NavigationItem navitemType="Landing" link="/">Mission</NavigationItem>
                    <NavigationItem navitemType="Landing" Type="NavButton" link="/login">Log In</NavigationItem>
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
                        <h4>{firstname + " " + lastname}</h4>
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
        settings: state.Nav.settings,
        token: state.Auth.token,
        flag: state.Auth.flag
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onfetchsettings: (token) => dispatch(actions.FetchUserSettings(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);
