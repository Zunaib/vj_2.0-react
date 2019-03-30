import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    let navitems = null;
    if (props.Type === "Landing") {
        navitems = (
            <ul className={classes.NavigationItemsLanding}>
                <NavigationItem navitemType = "Landing" link="/dashboard" clicked={props.dashboardClicked}>Dashboard</NavigationItem>
                <NavigationItem navitemType = "Landing" link="/">About</NavigationItem>
                <NavigationItem navitemType = "Landing" link="/">Mission</NavigationItem>
                <NavigationItem navitemType = "Landing" Type="NavButton" link="/login">Log In</NavigationItem>
                <NavigationItem navitemType = "Landing" Type="NavButton" link="/signup">Sign Up</NavigationItem>
            </ul>
        );
    } else if (props.Type === "Web") {
        navitems = (
            <ul className={classes.NavigationItemsWeb}>
                <NavigationItem navitemType = "Web" link="/" clicked={props.webClicked}>Web</NavigationItem>
                <NavigationItem navitemType = "Web" link="/">Messages</NavigationItem>
                <NavigationItem navitemType = "Web" link="/">Notifications</NavigationItem>
                <NavigationItem navitemType = "Web" link="/">Image</NavigationItem>
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