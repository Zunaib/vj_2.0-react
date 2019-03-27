import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../Sidedrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => (
    <nav className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className={classes.Logo}>
            <Logo logoType="White" />
            
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </nav>
);

export default Toolbar;