import React, { Fragment } from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        case ('password'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                type={props.elementType}
                value={props.value}
                onChange={props.changed} />;
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }
    let label = null;
    if (props.label) {
        label = <label>{props.label}</label>;
    }

    let error = null;

    if (props.invalid && props.label === "Username" && props.touched && props.shouldValidate) {
        error = <p className={classes.ErrorInput}>Inavlid : 5-15 Length and AlphaNumeric</p>;

        if (props.value === "" && props.touched && props.shouldValidate) {
            error = <p className={classes.ErrorInput}>Empty Fields Invalid</p>;
        }

    }

    if (props.invalid && props.label === "email" && props.touched && props.shouldValidate) {
        error = <p className={classes.ErrorInput}>Inavlid Email: Follow abc@xyz.com</p>;

        if (props.value === "" && props.touched && props.shouldValidate) {
            error = <p className={classes.ErrorInput}>Empty Fields Invalid</p>;
        }

    }

    if (props.invalid && props.label === "password" && props.touched && props.shouldValidate) {
        error = <p className={classes.ErrorInput}>Inavlid Password: 7-20 Length and AlphaNumeric </p>;

        if (props.value === "" && props.touched && props.shouldValidate) {
            error = <p className={classes.ErrorInput}>Empty Fields Invalid</p>;
        }

    }


    return (
        <Fragment>
            <div className={classes.Input}>
                {label}
                {inputElement}
            </div>
            {error}
        </Fragment>
    );

};

export default input;