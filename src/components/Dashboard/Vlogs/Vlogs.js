import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Vlogs.css';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import VlogCard from '../../UI/Card/Vlog/VlogCard';
class Vlogs extends Component {

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
            <Auxilary >
                {cards}
            </Auxilary>
        );
    }
}

export default Vlogs;
