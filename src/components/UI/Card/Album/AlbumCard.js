import React from 'react';
import classes from './AlbumCard.css';

const AlbumCard = (props) => {

    return (
        <div className={classes.CollectionCard}>
            <div className={classes.CollectionDrop}>
                <div className={classes.CollectionCardText}>
                    <h4>Collection Type</h4>
                    <h1>Collection Name</h1>
                </div>
            </div>
        </div>
    );
};

export default AlbumCard;