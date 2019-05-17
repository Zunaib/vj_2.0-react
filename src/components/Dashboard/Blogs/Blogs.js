import classes from './Blogs.css';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import BlogCard from '../../UI/Card/Blog/BlogCard';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class Vlogs extends Component {

    render() {
        const blogs = this.props.blogs;
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
                {cards}
            </Auxilary>
        );
    }
}

export default Vlogs;
