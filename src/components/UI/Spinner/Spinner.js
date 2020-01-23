import React from 'react';

import classes from './Spinner.css';

const spinner = () => (
    <div className={classes.semipolar}>
        <div className={classes.ring}></div>
        <div className={classes.ring}></div>
        <div className={classes.ring}></div>
        <div className={classes.ring}></div>
        <div className={classes.ring}></div>
    </div>
);

export default spinner;