import React, { Component } from 'react';
import classes from './UserAccountSettings.css';
import Card from '../../components/UI/Card/Card';


class UserAccountSettings extends Component {

    render() {
        return (
            <div className={classes.Main}>
                <div className={classes.StatsCard}>
                    <Card cardType="profileStatsCard" />
                </div>
                <div className={classes.FormCard}>
                    <Card cardType="formCard" />

                </div>
                <div className={classes.ProfileCard}>
                    <Card cardType="profileCard" />

                </div>

            </div>
        )
    }
}


export default UserAccountSettings;
