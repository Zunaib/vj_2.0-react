import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../Sidedrawer/DrawerToggle/DrawerToggle';
import SearchBar from '../../UI/Search/Search';

const Toolbar = (props) => {
    let navbar = null;
    if (props.Type === "Landing") {
        navbar = (
            <nav className={classes.ToolbarLanding}>
                <DrawerToggle clicked={props.drawerToggleClicked} Color="White" />
                <div className={classes.Logo}>
                    <Logo logoType="White" />
                </div>
                <nav className={classes.DesktopOnly}>
                    <NavigationItems Type="Landing" />
                </nav>
            </nav>
        );
    } else if (props.Type === "Web") {
        navbar = (
            <nav className={classes.ToolbarWeb}>
                <DrawerToggle clicked={props.drawerToggleClicked} Color="Gray" />
                <SearchBar />
                <div className={classes.LogoBlack}>
                    <Logo logoType="Black" />

                </div>
                <nav className={classes.DesktopOnly}>
                    <NavigationItems Type="Web" />

                </nav>
            </nav>
        );
    }
    return (
        <div>
            {navbar}
        </div>
    );
};

export default Toolbar;