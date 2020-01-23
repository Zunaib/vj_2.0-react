import React from 'react';
import classes from './User.css';
// import test from '../../../../assets/images/dpp.jpg';
const UserCard = (props) => {

    let imgpath = 'http://localhost:5000' + props.image;
    return (
        <div className={classes.ProductCard}>
            <img src={imgpath} alt="" />
            <div className={classes.CardText}>
                <h4>{props.firstname + " " + props.lastname} </h4>
            </div>
        </div>
    );
};

export default UserCard;