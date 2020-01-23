import React from 'react';
import classes from './AboutUs.css';


const AboutUs = (props) => (
    <section className={classes.Misc} ref={props.aboutRef}>
        <h2>About Us</h2>
        <div>
            <p>	An incredible eye for what’s next in fashion. A passionate drive to exceed expectations. We work to deliver the best possible shopping experience, helping our customers express their style, rather than just buying fashion
</p>
        </div>
    </section>
);

export default AboutUs;