import React, { Component } from 'react'
import classes from './Search.css';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import Usercard from '../../components/UI/Card/User/User';
import BlogCard from '../../components/UI/Card/Blog/BlogCard';
import VlogCard from '../../components/UI/Card/Vlog/VlogCard';
import ProductCard from '../../components/UI/Card/Product/ProductCard';

import Select from 'react-select';


export class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: null,
            blogs: null,
            vlogs: null,
            users: null,
            content: { value: "users", label: "Users" },
            selectedSort: null,
            sortByOptions: []
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
        let { value } = event;

        console.log(value)

        if (value === 'users') {
            this.setState({ content: event });
        }
        if (value === 'blogs') {
            const options = [
                { value: 'name a to z', label: 'Name A to Z' },
                { value: 'name z to a', label: 'Name Z to A' },
                { value: 'by earliest', label: 'By Earliest' },
                { value: 'by oldest', label: 'By Oldest' },
            ];
            this.setState({ content: event, sortByOptions: options });
        }
        if (value === 'vlogs') {
            const options = [
                { value: 'name a to z', label: 'Name A to Z' },
                { value: 'name z to a', label: 'Name Z to A' },
                { value: 'by earliest', label: 'By Earliest' },
                { value: 'by oldest', label: 'By Oldest' },
            ];
            this.setState({ content: event, sortByOptions: options });
        }
        if (value === 'products') {

            const options = [
                { value: 'name a to z', label: 'Name A to Z' },
                { value: 'name z to a', label: 'Name Z to A' },
                { value: 'by earliest ', label: 'By Earliest' },
                { value: 'by oldest', label: 'By Oldest' },
                { value: 'price max first', label: 'Price Max First' },
                { value: 'price min first', label: 'Price Min First' }
            ];

            this.setState({ content: event, sortByOptions: options });
        }
    }
    handleSelectedSort = (selectedSort) => {

        console.log(selectedSort)

        this.setState({ selectedSort: selectedSort })
        const prodtab = this.state.content.value === "products";
        const blogtab = this.state.content.value === "blogs";
        const vlogtab = this.state.content.value === "vlogs";

        if (selectedSort.value === "by earliest") {
            if (prodtab) {
                let products = this.state.products;
                products.sort(function (a, b) {
                    var keyA = new Date(a.createdAt),
                        keyB = new Date(b.createdAt);
                    // Compare the 2 dates
                    if (keyA > keyB) return -1;
                    if (keyA < keyB) return 1;
                    return 0;
                });
                this.setState({ products: products })
            } else if (vlogtab) {
                let vlogs = this.state.vlogs;
                vlogs.sort(function (a, b) {
                    var keyA = new Date(a.createdAt),
                        keyB = new Date(b.createdAt);
                    // Compare the 2 dates
                    if (keyA > keyB) return -1;
                    if (keyA < keyB) return 1;
                    return 0;
                });
                this.setState({ vlogs: vlogs })
            } else if (blogtab) {
                let blogs = this.state.blogs;
                blogs.sort(function (a, b) {
                    var keyA = new Date(a.createdAt),
                        keyB = new Date(b.createdAt);
                    // Compare the 2 dates
                    if (keyA > keyB) return -1;
                    if (keyA < keyB) return 1;
                    return 0;
                });
                this.setState({ blogs: blogs })
            }
        } else if (selectedSort.value === "by oldest") {
            if (prodtab) {
                let products = this.state.products;
                let arr = products.sort(function (a, b) {
                    var keyA = new Date(a.createdAt),
                        keyB = new Date(b.createdAt);
                    // Compare the 2 dates
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                });
                this.setState({ products: arr })
            } else if (vlogtab) {
                let vlogs = this.state.vlogs;
                let arr = vlogs.sort(function (a, b) {
                    var keyA = new Date(a.createdAt),
                        keyB = new Date(b.createdAt);
                    // Compare the 2 dates
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                });
                this.setState({ vlogs: arr })
            } else if (blogtab) {
                let blogs = this.state.blogs;
                let arr = blogs.sort(function (a, b) {
                    var keyA = new Date(a.createdAt),
                        keyB = new Date(b.createdAt);
                    // Compare the 2 dates
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                });
                this.setState({ blogs: arr })
            }
        } else if (selectedSort.value === "name a to z") {
            if (prodtab) {
                let products = this.state.products;
                let arr = products.sort(function (a, b) {
                    if (a.productName < b.productName) { return -1; }
                    if (a.productName > b.productName) { return 1; }
                    return 0;
                })
                this.setState({ products: arr })
            } else if (vlogtab) {
                let vlogs = this.state.vlogs;
                let arr = vlogs.sort(function (a, b) {
                    if (a.title < b.title) { return -1; }
                    if (a.title > b.title) { return 1; }
                    return 0;
                })
                this.setState({ vlogs: arr })
            } else if (blogtab) {
                let blogs = this.state.blogs;
                let arr = blogs.sort(function (a, b) {
                    if (a.title < b.title) { return -1; }
                    if (a.title > b.title) { return 1; }
                    return 0;
                })
                this.setState({ blogs: arr })

            }
        } else if (selectedSort.value === "name z to a") {
            if (prodtab) {
                let products = this.state.products;
                let arr = products.sort(function (a, b) {
                    if (a.productName > b.productName) { return -1; }
                    if (a.productName < b.productName) { return 1; }
                    return 0;
                })
                this.setState({ products: arr })
            } else if (vlogtab) {
                let vlogs = this.state.vlogs;
                let arr = vlogs.sort(function (a, b) {
                    if (a.title > b.title) { return -1; }
                    if (a.title < b.title) { return 1; }
                    return 0;
                })
                this.setState({ vlogs: arr })
            } else if (blogtab) {
                let blogs = this.state.blogs;
                let arr = blogs.sort(function (a, b) {
                    if (a.title > b.title) { return -1; }
                    if (a.title < b.title) { return 1; }
                    return 0;
                })
                this.setState({ blogs: arr })

            }
        } else if (selectedSort.value === "price max first") {
            if (prodtab) {
                let products = this.state.products;
                let arr = products.sort(function (a, b) {
                    if (a.price > b.price) { return -1; }
                    if (a.price < b.price) { return 1; }
                    return 0;
                })
                this.setState({ products: arr })
            }
        } else if (selectedSort.value === "price min first") {
            if (prodtab) {
                let products = this.state.products;
                let arr = products.sort(function (a, b) {
                    if (a.price < b.price) { return -1; }
                    if (a.price > b.price) { return 1; }
                    return 0;
                })
                this.setState({ products: arr })
            }
        }
    }

    render() {

        let content = null;
        if (this.state.content.value === 'users') {
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
        } else if (this.state.content.value === 'blogs') {
            if (this.state.blogs) {
                content = (this.state.blogs.map((blog, index = blog._id) => (
                    <BlogCard
                        key={index}
                        bid={blog._id}
                        title={blog.title}
                        likes={blog.likes}
                        description={blog.description}
                        thumbnail={blog.thumbnail}
                    />

                )));
            }
        } else if (this.state.content.value === 'vlogs') {
            if (this.state.vlogs) {
                content = (this.state.vlogs.map((vlog, index = vlog._id) => (
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
            }
        } else if (this.state.content.value === 'products') {
            if (this.state.products) {
                content = (this.state.products.map((product, index = product._id) => (
                    <ProductCard
                        key={product._id}
                        pid={product._id}
                        likes={product.likes}
                        name={product.productName}
                        price={product.price}
                        images={product.images}
                        desc={product.description}
                    />

                )));
            }
        }

        const options = [
            { value: 'users', label: 'Users' },
            { value: 'products', label: 'Products' },
            { value: 'vlogs', label: 'Vlogs' },
            { value: 'blogs', label: 'Blogs' },
        ];

        return (
            <div className={classes.Main}>
                <div className={classes.FilterDiv}>
                    <div className={classes.FilterBy}>
                        <h3>Filter By :</h3>
                        <Select
                            className={classes.selectcss}
                            value={this.state.content}
                            onChange={this.setContent}
                            options={options}
                        />
                        <h3>Sort By :</h3>
                        <Select
                            className={classes.selectcss}
                            value={this.state.selectedSort}
                            onChange={this.handleSelectedSort}
                            options={this.state.sortByOptions}
                        />
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
