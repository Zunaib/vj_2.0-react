import React from 'react';
import classes from './FileUpload.css';

const FileUpload = (props) => {
    return (
        <div className={classes.file}>
            <input type="file" name="file" id="file" className={classes.inputfile} onChange={props.clicked} multiple />
            <label htmlFor="file">Images</label>
            <p>{props.text}</p>
        </div>
    )
}

export default FileUpload;
