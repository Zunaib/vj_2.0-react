import React, { Component } from 'react';
import classes from './RecentVlogs.css';
import VlogCard from '../../UI/Card/Vlog/ModifiedCard';

class RecentVlogs extends Component {

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
            < div className={classes.RecentVlog} >
                <h2>Recent Vlogs</h2>
                <hr></hr>
                {cards}
            </div >
        );
    }
};

export default RecentVlogs;