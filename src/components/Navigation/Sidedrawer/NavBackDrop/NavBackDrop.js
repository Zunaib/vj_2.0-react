import React from 'react';
import classes from './NavBackDrop.css';
import NavigationItems from '../../NavigationItems/NavigationItems';

const NavBackDrop = (props) => (
    props.show ? <div
        className={classes.NavBackdrop}
        onClick={props.clicked}
    >
        <NavigationItems Type="Landing" dashboardClicked={props.ToWebToolbar} />
    </div> : null
);

export default NavBackDrop;