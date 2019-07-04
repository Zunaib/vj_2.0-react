import Auxilary from '../../../hoc/Auxilary/Auxilary';
import BlogCard from '../../UI/Card/Blog/BlogCard';
import React, { Component } from 'react';
class Vlogs extends Component {

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
            <Auxilary >
                {cards}
            </Auxilary>
        );
    }
}

export default Vlogs;
