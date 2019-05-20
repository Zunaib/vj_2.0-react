import React from 'react';
import classes from './Services.css';

const Services = () => (
    <section className={classes.Services}>
        <div >
            <p className={classes.ServiceIcon}><i className="fas fa-hourglass"></i></p>
            <p className={classes.ServiceTitle}>Think</p>
            <p>Creators are society’s bastions of empathy and instigators of new perspectives. Imagine, hone your senses and absorb the moment and then come to us for a flawless execution. Let us help you write your imagination into reality.
</p>
        </div>
        <div >
            <p className={classes.ServiceIcon}><i className="fas fa-pencil-alt"></i></p>
            <p className={classes.ServiceTitle}>Design</p>
            <p>	A simple word, enfolding limitless possibilities, a process of creating purposeful and innovative solutions that embody functional and aesthetic demands based on the needs of the intended user.</p>
        </div>
        <div >
            <p className={classes.ServiceIcon}><i className="fas fa-share"></i></p>
            <p className={classes.ServiceTitle}>Provide</p>
            <p>	We make sure that your interests and your voice resonate perfectly with the collaborators we provide to you. In our fashion portal register you can search among Pakistan’s emerging designers to find the one that best suits your requirements and needs.
</p>
        </div>
    </section>
);

export default Services;
