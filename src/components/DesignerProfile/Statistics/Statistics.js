import React from 'react';
import classes from './Statistics.css';

const Statistics = (props) => {

    return (
        <div className={classes.Stats}>
            <div className={classes.StatsWork}>
                <h3>Statistics</h3>
                <div className={classes.Numbers}>
                    <div className={classes.StatNum}>
                        <h3>Products</h3>
                        <p>650</p>
                    </div>
                    <div className={classes.StatNum}>
                        <h3>Collections</h3>
                        <p>340</p>
                    </div>
                    <div className={classes.StatNum}>
                        <h3>Likes</h3>
                        <p>6630</p>
                    </div>
                    <div className={classes.StatNum}>
                        <h3>Followers</h3>
                        <p>9304</p>
                    </div>

                </div>


                <hr></hr>

            </div>
        </div>
    )

};

export default Statistics;