import React, { Component } from 'react';
import classes from './TopBlogs.css';
import BlogCard from '../../UI/Card/Blog/Modified';

class TopBlogs extends Component {

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
                show={true}
            />
        )));

        return (
            < div className={classes.TopBlog} >
                <h2>Top Blogs</h2>
                <hr></hr>
                {cards}
            </div >
        );
    }
};

export default TopBlogs;