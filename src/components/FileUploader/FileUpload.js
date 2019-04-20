import React from 'react';
import classes from './FileUpload.css';

const FileUpload = (props) => {
    return (
        <div className={classes.file}>
            <input type="file" name="file" id="file" className={classes.inputfile} onChange={props.clicked} />
            <label htmlFor="file">Choose a file</label>
            <p>Image Would Be Album Thumbnail</p>
        </div>
    )
}

export default FileUpload;
