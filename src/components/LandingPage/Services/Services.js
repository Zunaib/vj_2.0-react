import React from 'react';
import classes from './Services.css';

const Services = () => (
    <section className={classes.Services}>
        <div >
            <p className={classes.ServiceIcon}><i className="fas fa-hourglass"></i></p>
            <p className={classes.ServiceTitle}>Think</p>
            <p>Mauris vitae turpis ut sem blandit consequat et at ligula. Suspendisse quam lectus, tristique dapibus sapien et, tempus suscipit nisl.</p>
        </div>
        <div >
            <p className={classes.ServiceIcon}><i className="fas fa-pencil-alt"></i></p>
            <p className={classes.ServiceTitle}>Design</p>
            <p>Nulla eu metus faucibus, vehicula tortor quis, venenatis odio. Nullam purus mauris, feugiat in odio vitae, posuere volutpat libero. Sed et convallis libero.</p>

        </div>
        <div >
            <p className={classes.ServiceIcon}><i className="fas fa-share"></i></p>
            <p className={classes.ServiceTitle}>Provide</p>
            <p>Ut ornare vitae enim a rhoncus. Nullam aliquet tristique scelerisque. Sed volutpat dictum risus ac laoreet. Suspendisse id lorem in enim sollicitudin varius.</p>

        </div>
    </section>
);

export default Services;
