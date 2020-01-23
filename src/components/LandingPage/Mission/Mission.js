import React from 'react';
import classes from './Mission.css';

const Mission = (props) => (
    <section className={classes.Misc} ref={props.missionRef}>
        <h2>Our Mission</h2>
        <div>
            <p>
                We provide a platform to the best designers in town to create masterpieces using art and imaginative concepts to develop and deliver ideas to a client that would inform, inspire, or motivate a consumer. It’s our job to provide cutting edge ideas, latest trends of the emerging fashions globally and to hook you up with our best collaborators so that you can choose the best for yourself through their eloquently showcased designs.
        </p>
        </div>
    </section>
);

export default Mission;