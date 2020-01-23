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
        displayPicture: '',
        firstName: '',
        lastName: '',
        settings: null
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.settings !== prevState.settings) {
            return { settings: nextProps.settings };
        }
        if (nextProps.settings !== prevState.settings) {
            return { settings: nextProps.settings };
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.settings !== this.props.settings) {
            if (this.props.settings) {
                //Perform some operation here
                this.setState({ settings: this.props.settings });
                this.setState({ userimage: this.props.settings[0].displayPicture });
                this.setState({ userfirst: this.props.settings[0].firstName });
                this.setState({ userlast: this.props.settings[0].lastName });
            }
        }
    }




    render() {


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
            let img;
            let firstname;
            let lastname;
            if (this.state.settings) {
                img = display;
                firstname = this.state.settings[0].firstName;
                console.log(this.state.settings[0])
                lastname = this.state.settings[0].lastName;
                if (this.state.settings[0].displayPicture) {
                    img = 'http://localhost:5000' + this.state.settings[0].displayPicture;
                }
            }

            navitems = (
                <div className={classes.ContainerWeb}>

                    <ul className={classes.NavigationItemsWeb}>

                        <div className={classes.NavlinkCart} >
                            <NotificDropdown />
                        </div>


                        {/* <MsgDropdown /> */}
                        <NavLink to="/dashboard/messenger/convos" className={classes.NavlinkCart}>
                            <div className={classes.Outerdiv} >
                                <i className="fas fa-inbox"
                                >
                                </i>
                            </div>
                        </NavLink>


                        <div className={classes.ImageButton} >
                            <h5>{firstname ? firstname + " " + lastname : 'Name'}</h5>
                            {/* <img className={classes.Image} src={img} alt="NavDisplay" /> */}
                            <div className={classes.Dropdown} >
                                <Dropdown image={img} firstname={firstname} lastName={lastname} />
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
