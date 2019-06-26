import React from 'react';
import classes from './FileUpload.css';

const FileUpload = (props) => {
    return (
        <div className={classes.file}>
            <input type="file" name="file" id="file" className={classes.inputfile} onChange={props.clicked} />
            <label htmlFor="file" className={classes.FileLabel}>{props.text}</label>
            <p>Select {props.text}</p>
        </div>
    )
}

export default FileUpload;
