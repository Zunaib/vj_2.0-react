import React, { Fragment } from 'react';

import classes from './CustomInput.css';

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
    return (
        <Fragment>
            <div className={classes.Input}>
                {label}
                {inputElement}
            </div>
        </Fragment>
    );

};

export default input;