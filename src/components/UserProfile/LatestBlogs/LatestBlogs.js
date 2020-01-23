import React, { Component } from 'react';
import classes from './LatestBlogs.css';
import BlogCard from '../../UI/Card/Blog/BlogCard';

class LatestVlogs extends Component {
    render() {
        const blogs = this.props.blogs;
        const cards = (blogs.map((blog, index = blog._id) => (
            <BlogCard
                key={index}
                bid={blog._id}
                title={blog.title}
                likes={blog.likes}
                description={blog.description}
                thumbnail={blog.thumbnail}
            />

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