import React, { Component } from 'react';
import classes from './LatestVlogs.css';
import { NavLink } from 'react-router-dom';
import VlogCard from '../../UI/Card/Vlog/VlogCard';

class LatestVlogs extends Component {
    render() {
        const vlogs = this.props.vlogs;
        const cards = (vlogs.map((vlog, index = vlog._id) => (
            <NavLink className={classes.Link} to={"/dashboard/vlogs/" + vlog._id} key={index}>
                <VlogCard
                    key={index}
                    title={vlog.title}
                    description={vlog.description}
                    year={vlog.year}
                    videoLink={vlog.videoLink}
                />
            </NavLink>

        )));

        return (
            <div className={classes.Work}>
                <div className={classes.Content}>
                    <h3>Latest Vlogs</h3>
                    <NavLink to="/dashboard/handle_vlog/add_vlog">
                        <div className={classes.AddAlbumButton}>
                            <h4>Add Vlog</h4>
                            <i className="fas fa-plus"></i>
                        </div>
                    </NavLink>
                    <div className={classes.Collections}>
                        {cards}
                    </div>
                </div>
            </div>
        );
    }


};



export default LatestVlogs;