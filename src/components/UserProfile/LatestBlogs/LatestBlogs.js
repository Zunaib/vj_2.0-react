import React, { Component } from 'react';
import classes from './LatestBlogs.css';
import { NavLink } from 'react-router-dom';
import BlogCard from '../../UI/Card/Blog/BlogCard';

class LatestVlogs extends Component {
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
            <div className={classes.Work}>
                <div className={classes.Content}>
                    <h3>Latest Blogs</h3>
                    <div className={classes.Collections}>
                        {cards}
                    </div>
                </div>
            </div>
        );
    }


};



export default LatestVlogs;