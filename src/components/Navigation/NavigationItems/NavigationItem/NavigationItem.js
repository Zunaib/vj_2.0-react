import React from 'react';
import classes from './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink
            // activeClassName={classes.active}
            exact
            className={[classes[props.Type]].join(' ')}
            to={props.link}>
            {props.children}
        </NavLink>
    </li>
);

export default NavigationItem;