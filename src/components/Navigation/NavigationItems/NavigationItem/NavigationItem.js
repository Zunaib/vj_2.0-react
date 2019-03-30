import React from 'react';
import classes from './NavigationItem.css';
import { NavLink } from 'react-router-dom';
import Auxilary from '../../../../hoc/Auxilary/Auxilary';

const NavigationItem = (props) => {
    let navitem = null;
    if (props.navitemType === "Landing") {
        navitem = (
            <li className={classes.NavigationItem}>
                <NavLink
                    className={[classes[props.Type]].join(' ')}
                    to={props.link}
                    onClick={props.clicked}
                >
                    {props.children}
                </NavLink>
            </li>
        );
    } else if (props.navitemType === "Web") {
        navitem = (
            <li className={classes.NavigationItemWeb}>
                <NavLink
                    className={[classes[props.Type]].join(' ')}
                    to={props.link}
                    onClick={props.clicked}
                >
                    {props.children}
                </NavLink>
            </li>
        );
    }

    return (
        <Auxilary>
            {navitem}
        </Auxilary>
    );

};

export default NavigationItem;