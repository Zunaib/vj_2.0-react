import React from 'react';
import classes from './ProfileStats.css';
const ProfileStatsCard = (props) => {

    return (
        <div className={classes.ProfileStatsCard}>
            <div className={classes.ProfileStatsText}>
                <div className={classes.Head}>
                    <h4>Statistics</h4>
                </div>

                <h5>Followers: {props.followers.length}</h5>
                <h5>Following: {props.followings.length}</h5>
                <h5>Likes: 0</h5>
                <div className={classes.Head}>
                    <h4>User Details</h4>
                </div>
                <h5>User Since: {props.UserSince.split("T")[0]}</h5>
            </div>
        </div>
    );
};

export default ProfileStatsCard;