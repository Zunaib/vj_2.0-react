import classes from './Blogs.css';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import BlogCard from '../../UI/Card/Blog/BlogCard';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class Conversation extends Component {

    render() {
        const conversation = this.props.convo;
        const cards = (blogs.map((blog, index = blog._id) => (
            <NavLink className={classes.Link} to={"/dashboard/blogs/" + blog._id} key={index}>
                <BlogCard
                    key={index}
                    title={blog.title}
                    description={blog.description}
                    thumbnail={blog.thumbnail}
                />
            </NavLink>

        )));

        return (
            <Auxilary >
                 <div className={classes.Conversation}>

<div className={classes.Messages}>
    <div className={classes.SingleConvo}>
        <div className={classes.SingleConvoHeader}>
            <h4>13/5/2017</h4>
            <hr></hr>
        </div>
        <div className={classes.Incoming}>
            <p>
                Incoming Message
        </p>
        </div>
        <div className={classes.Outgoing}>
            <p>
                Outgoing Message
        </p>
        </div>
        <div className={classes.Outgoing}>
            <p>
                Outgoing Message
        </p>
        </div>
    </div>

    <div className={classes.SingleConvo}>
        <div className={classes.SingleConvoHeader}>
            <h4>13/5/2017</h4>
            <hr></hr>
        </div>
        <div className={classes.Incoming}>
            <p>
                Incoming Message
        </p>
        </div>
        <div className={classes.Outgoing}>
            <p>
                Outgoing Message
        </p>
        </div>
        <div className={classes.Outgoing}>
            <p>
                Outgoing Message
        </p>
        </div>
    </div>

    <div className={classes.SingleConvo}>
        <div className={classes.SingleConvoHeader}>
            <h4>13/5/2017</h4>
            <hr></hr>
        </div>
        <div className={classes.Incoming}>
            <p>
                Incoming Message
        </p>
        </div>
        <div className={classes.Outgoing}>
            <p>
                Outgoing Message
        </p>
        </div>
        <div className={classes.Outgoing}>
            <p>
                Outgoing Message
        </p>
        </div>
    </div>

    <div className={classes.SingleConvo}>
        <div className={classes.SingleConvoHeader}>
            <h4>13/5/2017</h4>
            <hr></hr>
        </div>
        <div className={classes.Incoming}>
            <p>
                Incoming Message
        </p>
        </div>
        <div className={classes.Outgoing}>
            <p>
                Outgoing Message
        </p>
        </div>
        <div className={classes.Outgoing}>
            <p>
                Outgoing Message
        </p>
        </div>
    </div>

    <div className={classes.SingleConvo}>
        <div className={classes.SingleConvoHeader}>
            <h4>13/5/2017</h4>
            <hr></hr>
        </div>
        <div className={classes.Incoming}>
            <p>
                Incoming Message
        </p>
        </div>
        <div className={classes.Outgoing}>
            <p>
                Outgoing Message
        </p>
        </div>
        <div className={classes.Outgoing}>
            <p>
                Outgoing Message
        </p>
        </div>
    </div>

</div>
</div>
            </Auxilary>
        );
    }
}

export default Conversation;
