import React from 'react';
import classes from './VlogCard.css';
import ReactPlayer from 'react-player'
const VlogCard = (props) => {

    const videostyles = {
        playing: true,
        controls: true,
        volume: 0,
        width: "100%",
        height: "100%"
    }

    let video = 'http://localhost:5000' + props.videoLink;

    return (
        <div className={classes.VlogCard}>
            <ReactPlayer url={video} {...videostyles} />


            <div className={classes.CardText}>
                <h4><b>{props.title}</b></h4>
                <div className={classes.Desc}>
                    {props.description}

                </div>
            </div>
            <div className={classes.CardInfo}>
                <div className={classes.CardButton}>
                    Share Button
            </div>
                <div className={classes.CardButton}>
                    Button
            </div>
            </div>
        </div>
    );
};

export default VlogCard;