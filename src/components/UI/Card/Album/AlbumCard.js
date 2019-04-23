import React from 'react';
import classes from './AlbumCard.css';
// import test from '../../../../assets/images/testimg.jpg';

const AlbumCard = (props) => {

    let imgurl = 'http://localhost:5000' + props.thumbnail;

    let sectionStyle = {
        'backgroundImage': "url(" + imgurl + ")"
    };

    return (
        <div className={classes.CollectionCard}

            style={sectionStyle}

        >
            <div className={classes.CollectionDrop}>
                <div className={classes.CollectionCardText}>
                    <h4>{props.season + ' ' + props.year}</h4>
                    <h2>{props.name}</h2>
                </div>
            </div>
        </div >
    );
};

export default AlbumCard;