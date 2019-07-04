import React, { Component } from 'react';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import VlogCard from '../../UI/Card/Vlog/VlogCard';
class Vlogs extends Component {

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
            <Auxilary >
                {cards}
            </Auxilary>
        );
    }
}

export default Vlogs;
