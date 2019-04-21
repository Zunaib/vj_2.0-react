import React from 'react';
import classes from './VlogCard.css';
import testimg from '../../../../assets/images/testimg.jpg'
const VlogCard = (props) => {

    return (
        <div className={classes.VlogCard}>
            <img src={testimg} alt="" />
            <div className={classes.CardText}>
                <h4><b>Title</b></h4>
                <div className={classes.Desc}>
                    Dolce & Gabbana's 'Greta' tote has been crafted in Italy from hard-wearing red textured-leather.</div>
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