import React from 'react';
import classes from './ProfileCard.css';
import display from '../../../../assets/images/DP.jpg'
const ProfileCard = (props) => {

    return (
        <div className={classes.ProfileCard}>
            <div className={classes.ProfileImageButton} >
                <img src={display} alt="" />
            </div>
            <div className={classes.ProfileCardText}>
                <h4><b>{props.profile.username}</b></h4>
                <h4>{props.profile.logger}</h4>
                <div className={classes.ProfileDesc}>
                    {props.profile.desc}</div>
            </div>
        </div>
    );
};

export default ProfileCard;