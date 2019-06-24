import React from 'react';
import classes from './Statistics.css';

const Statistics = (props) => {

    let productstat = props.products.length;
    let vlogstat = props.vlogs.length;
    let blogstat = props.blogs.length;
    let followersstat = props.followers.length;

    return (
        <div className={classes.Stats}>
            <div className={classes.StatsWork}>
                <h3>Statistics</h3>
                <div className={classes.Numbers}>
                    <div className={classes.StatNum}>
                        <h3>Products</h3>
                        <p>{productstat}</p>
                    </div>
                    <div className={classes.StatNum}>
                        <h3>Vlogs</h3>
                        <p>{vlogstat}</p>
                    </div>
                    <div className={classes.StatNum}>
                        <h3>Blogs</h3>
                        <p>{blogstat}</p>
                    </div>
                    <div className={classes.StatNum}>
                        <h3>Followers</h3>
                        <p>{followersstat}</p>
                    </div>

                </div>


                <hr></hr>

            </div>
        </div>
    )

};

export default Statistics;