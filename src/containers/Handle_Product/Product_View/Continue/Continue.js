import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Continue.css';
export class Continue extends Component {


    render() {

        return (
            <div className={classes.FormCard}>
                <NavLink to="/dashboard">
                    <h3>Continue Shopping</h3>
                </NavLink>
                <NavLink to="/dashboard/cart">
                    <h3>Continue To Cart</h3>
                </NavLink>
            </div>
        )
    }
}


export default Continue;
