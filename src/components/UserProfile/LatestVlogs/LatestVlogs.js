import React, { Component } from 'react';
import classes from './LatestVlogs.css';
import VlogCard from '../../UI/Card/Vlog/VlogCard';

class LatestVlogs extends Component {
    render() {
        const vlogs = this.props.vlogs;
        const cards = (vlogs.map((vlog, index = vlog._id) => (
            <VlogCard
                key={index}
                vid={vlog._id}
                likes={vlog.likes}
                title={vlog.title}
                description={vlog.description}
                year={vlog.year}
                videoLink={vlog.videoLink}
            />

        )));

        return (
            <div className={classes.Work}>
                <div className={classes.Content}>
                    <h3>Latest Vlogs</h3>
                    <div className={classes.Collections}>
                        {cards}
                    </div>
                </div>
            </div>
        );
    }


};



export default LatestVlogs;