import React from 'react';
import { NavLink } from 'react-router-dom';
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
                <NavLink to="/" className={classes.Logo}>
                    <div >
                        <Logo logoType="White" />
                    </div>
                </NavLink>
                <nav className={classes.DesktopOnly}>
                    <NavigationItems Type="Landing" scrollAbout={props.scrollToAbout} scrollMission={props.scrollToMission} />
                </nav>
            </nav>
        );
    } else if (props.Type === "Web") {
        navbar = (

            <nav className={classes.ToolbarWeb}>
                {/* <DrawerToggle clicked={props.drawerToggleClicked} Color="Gray" /> */}
                <div className={classes.CustNavItem}>

                    <NavLink className={classes.NavlinkCart} to="/dashboard">
                        <div className={classes.Outerdiv}>
                            <i className="fas fa-home"></i>
                        </div>
                    </NavLink>
                    <NavLink className={classes.NavlinkCart} to="/dashboard/cart">
                        <div className={classes.Outerdiv}>
                            <i className="fas fa-shopping-cart">
                                {/* <span className={classes.Badge}>3</span> */}
                            </i>
                        </div>
                    </NavLink>
                </div>
                <SearchBar />
                <NavLink to="/dashboard" className={classes.WebLogo}>
                    <div className={classes.LogoBlack}>
                        <Logo logoType="Black" />
                    </div>
                </NavLink>
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