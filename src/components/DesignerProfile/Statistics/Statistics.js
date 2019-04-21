import React from 'react';
import classes from './Statistics.css';

const Statistics = (props) => {

    return (
        <div className={classes.Stats}>
            <div className={classes.StatsWork}>
                <h3>Statistics</h3>
                <div className={classes.Numbers}>

                    <p><b>60</b> Products</p>
                    <p><b>60</b> Collections</p>
                    <p><b>60</b> Likes</p>
                    <p><b>60</b> Followers</p>
                </div>

                <hr></hr>


                <div className={classes.AboutWork} >
                    <h3>About His Work</h3>
                    <h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</h4>
                </div>

                <hr></hr>


                <div className={classes.Tags}>
                    <h3>Focus</h3>
                    <h4>Tops</h4>
                    <h4>Sunglasses</h4>
                </div>
            </div>
        </div>
    )

};

export default Statistics;