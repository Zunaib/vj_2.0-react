import React from 'react';
import classes from './FormCard.css';
const FormCard = (props) => {

    return (
        <div className={classes.FormCard}>
            <div className={classes.FormOverlapDiv} >
                <div><h1>{props.title}</h1></div>
            </div>
            <div className={classes.FormCardInfo}>
                <div className={classes.FormSide}>
                    <div className={classes.Form} >
                        {props.form}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormCard;