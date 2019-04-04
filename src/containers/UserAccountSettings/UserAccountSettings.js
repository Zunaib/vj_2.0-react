import React, { Component } from 'react';
import classes from './UserAccountSettings.css';
import Card from '../../components/UI/Card/Card';


class UserAccountSettings extends Component {

    render() {
        return (
            <div className={classes.Main}>
                <div className={classes.Blogs}>
                    <Card cardType="profileStatsCard" />
                </div>
                <div className={classes.ProductsPanel}>
                    <Card cardType="formCard" />

                </div>
                <div className={classes.Vlogs}>
                    <Card cardType="profileCard" />

                </div>

            </div>
        )
    }
}


export default UserAccountSettings;
