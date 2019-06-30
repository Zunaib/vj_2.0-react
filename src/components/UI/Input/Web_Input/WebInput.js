import React, { Fragment } from 'react';

import classes from './WebInput.css';

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
        case ('multiselect'):
            inputElement = (
                <select
                    size={4}
                    multiple
                    className={inputClasses.join(' ')}
                    value={props.value}
                    name={props.label}
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
        case ('file'):
            inputElement = <input
                className={[inputClasses].join(' ')}
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
    if (props.invalid && props.touched && props.shouldValidate) {

        if (props.shouldValidate.isNumeric) {
            error = <p className={classes.ErrorInput}>Inavlid Type or Length: 2-6 Numeric </p>;
        } else {
            if (props.label === "name") {
                error = <p className={classes.ErrorInput}>Inavlid Length: 5-40 Characters </p>;
            } else {
                error = <p className={classes.ErrorInput}>Inavlid Length: 10-200 Characters </p>;
            }
        }


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