import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
    <div className={classes.Container}>
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">About</NavigationItem>
            <NavigationItem link="/">Mission</NavigationItem>
            <NavigationItem link="/">Contact Us</NavigationItem>
            <NavigationItem Type="NavButton" link="/login">Log In</NavigationItem>
            <NavigationItem Type="NavButton" link="/signup">Sign Up</NavigationItem>
        </ul>
    </div>
);

export default NavigationItems;