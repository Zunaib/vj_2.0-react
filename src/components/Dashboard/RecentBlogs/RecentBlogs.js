import React, { Component } from 'react';
import classes from './RecentBlogs.css';
import BlogCard from '../../UI/Card/Blog/Modified';

class RecentBlogs extends Component {

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
            < div className={classes.RecentBlog} >
                <h2>Recent Blogs</h2>
                <hr></hr>
                {cards}
            </div >
        );
    }
};

export default RecentBlogs;