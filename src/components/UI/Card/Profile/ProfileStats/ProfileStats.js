import React from 'react';
import classes from './ProfileStats.css';
const ProfileStatsCard = (props) => {

    return (
        <div className={classes.ProfileStatsCard}>
            <div className={classes.ProfileStatsText}>
                <h4><b>Statistics</b></h4>
                <h6><b>Followers:</b></h6>
                <h6><b>Following:</b></h6>
                <h6><b>Likes:</b></h6>
                <h4><b>User Details</b></h4>
                <h6><b>User Since:</b></h6>
            </div>
        </div>
    );
};

export default ProfileStatsCard;