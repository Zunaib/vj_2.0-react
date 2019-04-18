import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import display from '../../../assets/images/DP.jpg';
// import Button from '../../UI/Button/Button';
import Dropdown from '../../UI/Dropdown/Dropdown';

const NavigationItems = (props) => {
    let navitems = null;
    if (props.Type === "Landing") {
        navitems = (
            <ul className={classes.NavigationItemsLanding}>
                <NavigationItem navitemType="Landing" link="/">About</NavigationItem>
                <NavigationItem navitemType="Landing" link="/">Mission</NavigationItem>
                <NavigationItem navitemType="Landing" Type="NavButton" link="/login">Log In</NavigationItem>
                <NavigationItem navitemType="Landing" Type="NavButton" link="/signup">Sign Up</NavigationItem>
            </ul>
        );
    } else if (props.Type === "Web") {
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
                    <h4>Zunaib Imtiaz</h4>
                    <img className={classes.Image} src={display} alt="NavDisplay" />
                </div>

                <div className={classes.Dropdown} >
                    <Dropdown />
                </div>



            </ul>
        );
    }

    return (
        <div className={classes.Container}>
            {navitems}
        </div>
    );
};

export default NavigationItems;