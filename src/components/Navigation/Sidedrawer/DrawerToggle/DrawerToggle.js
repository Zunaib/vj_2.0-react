import React from 'react';
import classes from './DrawerToggle.css';

const drawerToggle = (props) => {
    let drawer = null;
    if (props.Color === "White") {
        drawer = (
            <div className={classes.DrawerToggle} onClick={props.clicked}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    } else if (props.Color === "Gray") {
        drawer = (
            <div className={classes.DrawerToggleMain} onClick={props.clicked}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }

    return (
        <div>
            {drawer}
        </div>
    );

};

export default drawerToggle;