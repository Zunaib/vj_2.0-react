import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Button from '../../UI/Button/Button';
const NavigationItems = (props) => (
    <div className={classes.Container}>
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">About</NavigationItem>
            <NavigationItem link="/">Mission</NavigationItem>
            <NavigationItem link="/">Contact Us</NavigationItem>
            <Button btnType="NavButton" link="/">Log In</Button>
            <Button btnType="NavButton" link="/">Sign Up</Button>
        </ul>
    </div>
);

export default NavigationItems;