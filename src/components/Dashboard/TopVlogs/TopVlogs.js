import React, { Component } from 'react';
import classes from './TopVlogs.css';
import VlogCard from '../../UI/Card/Vlog/ModifiedCard';

class TopVlogs extends Component {

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
                show={true}
            />

        )));

        return (
            < div className={classes.TopVlog} >
                <h2>Recent Vlogs</h2>
                <hr></hr>
                {cards}
            </div >
        );
    }
};

export default TopVlogs;