import React from 'react';
import classes from './FileUpload.css';

const FileUpload = (props) => {
    return (
        <div className={classes.file}>
            <input type="file" name="file" id="file" className={classes.inputfile} onChange={props.clicked} multiple />
            <label htmlFor="file">Select 5 Images</label>
            <p>First Selected Image Would Be Thumbnail</p>
        </div>
    )
}

export default FileUpload;
