import React, { Component } from 'react'
import classes from './Search.css';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import Usercard from '../../components/UI/Card/User/User';
import BlogCard from '../../components/UI/Card/Blog/BlogCard';
import VlogCard from '../../components/UI/Card/Vlog/VlogCard';
import ProductCard from '../../components/UI/Card/Product/ProductCard';

export class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: null,
            blogs: null,
            vlogs: null,
            users: null,
            content: 'users',
        }


        this.setContent = this.setContent.bind(this);
    }



    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.users !== prevState.users) {
            return { users: nextProps.users };
        }
        if (nextProps.blogs !== prevState.blogs) {
            return { blogs: nextProps.blogs };
        }
        if (nextProps.vlogs !== prevState.vlogs) {
            return { vlogs: nextProps.vlogs };
        }
        if (nextProps.products !== prevState.products) {
            return { products: nextProps.products };
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.users !== this.props.users) {
            this.setState({ users: this.props.users });
        }
        if (prevProps.vlogs !== this.props.vlogs) {
            this.setState({ vlogs: this.props.vlogs });
        }
        if (prevProps.blogs !== this.props.blogs) {
            this.setState({ blogs: this.props.blogs });
        }
        if (prevProps.products !== this.props.products) {
            this.setState({ products: this.props.products });
        }
    }

    setContent(event) {
        let { value } = event.target;
        if (value === 'users') {
            this.setState({ content: 'users' });
        }
        if (value === 'blogs') {
            this.setState({ content: 'blogs' });
        }
        if (value === 'vlogs') {
            this.setState({ content: 'vlogs' });
        }
        if (value === 'products') {
            this.setState({ content: 'products' });
        }
    }

    render() {

        let content = null;
        if (this.state.content === 'users') {
            if (this.state.users) {
                content = (this.state.users.map((user, index = user._id) => (
                    <NavLink className={classes.Link} to={"/dashboard/userprofile/" + user._id} key={index}>
                        <Usercard
                            firstname={user.firstName}
                            lastname={user.lastName}
                            image={user.displayPicture}
                        />
                    </NavLink>

                )));
            }
        } else if (this.state.content === 'blogs') {
            if (this.state.blogs) {
                content = (this.state.blogs.map((blog, index = blog._id) => (
                    <NavLink className={classes.Link} to={"/dashboard/blogs/" + blog._id} key={index}>
                        <BlogCard
                            key={index}
                            title={blog.title}
                            description={blog.description}
                            thumbnail={blog.thumbnail}
                        />
                    </NavLink>

                )));
            }
        } else if (this.state.content === 'vlogs') {
            if (this.state.vlogs) {
                content = (this.state.vlogs.map((vlog, index = vlog._id) => (
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
            }
        } else if (this.state.content === 'products') {
            if (this.state.products) {
                content = (this.state.products.map((product, index = product._id) => (
                    <NavLink className={classes.Link} to={"/dashboard/products/" + product._id} key={index}>
                        <ProductCard
                            key={product._id}
                            name={product.productName}
                            price={product.price}
                            images={product.images}
                        />
                    </NavLink>

                )));
            }
        }





        return (
            <div className={classes.Main}>
                <div className={classes.FilterDiv}>
                    <div className={classes.FilterBy}>
                        <h3>Filter By :</h3>
                        <select className={classes.selectcss} onChange={this.setContent}>
                            <option value="users">Users</option>
                            <option value="products">Products</option>
                            <option value="vlogs">Vlogs</option>
                            <option value="blogs">Blogs</option>
                        </select>
                        {/* <h3>Sort By :</h3> */}
                        {/* <select className={classes.selectcss}>
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                        </select> */}
                    </div>
                </div>
                {content}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        vlogs: state.Search.vlogs,
        blogs: state.Search.blogs,
        users: state.Search.users,
        products: state.Search.products,
    };
}

export default connect(mapStateToProps, null)(Search);
