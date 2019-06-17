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


                <div className={classes.AboutWork} >
                    <h3>About His Work</h3>
                    <h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</h4>
                </div>

                <hr></hr>

            </div>
        </div>
    )

};

export default Statistics;