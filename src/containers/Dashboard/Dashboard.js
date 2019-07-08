import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/index';
import classes from './Dashboard.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Products from '../../components/Dashboard/Products/Products';
import Vlogs from '../../components/Dashboard/Vlogs/Vlogs';
import Blogs from '../../components/Dashboard/Blogs/Blogs';

import Select from 'react-select';

class Dashboard extends Component {
    state = {
        dashcontent: 'Products',
        products: null,
        vlogs: null,
        blogs: null,
        prodactive: true,
        vlogactive: false,
        blogactive: false,
        selectedSort: null,
        sortByOptions: [{ value: 'name a to z', label: 'Name A to Z' },
        { value: 'name z to a', label: 'Name Z to A' },
        { value: 'by earliest', label: 'By Earliest' },
        { value: 'by oldest', label: 'By Oldest' },
        { value: 'price max first', label: 'Price Max First' },
        { value: 'price min first', label: 'Price Min First' }]
    }


    componentDidMount = () => {
        this.props.onfetchproducts(this.props.token);
        this.props.onfetchvlogs(this.props.token);
        this.props.onfetchblogs(this.props.token);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.products !== prevState.products) {
            return { products: nextProps.products };
        }
        if (nextProps.vlogs !== prevState.vlogs) {
            return { vlogs: nextProps.vlogs };
        }
        if (nextProps.blogs !== prevState.blogs) {
            return { blogs: nextProps.blogs };
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.products !== this.props.products) {
            //Perform some operation here
            this.setState({ products: this.props.products });
        }
        if (prevProps.vlogs !== this.props.vlogs) {
            //Perform some operation here
            this.setState({ vlogs: this.props.vlogs });
        }
        if (prevProps.blogs !== this.props.blogs) {
            //Perform some operation here
            this.setState({ blogs: this.props.blogs });
        }
    }


    getContent = (currentContent) => {
        const Content = {
            Products: <Products products={this.state.products} />,
            Blogs: <Blogs blogs={this.props.blogs} />,
            Vlogs: <Vlogs vlogs={this.props.vlogs} />
        };
        return Content[currentContent];
    }

    toggleVlogs = () => {

        const options = [
            { value: 'name a to z', label: 'Name A to Z' },
            { value: 'name z to a', label: 'Name Z to A' },
            { value: 'by earliest', label: 'By Earliest' },
            { value: 'by oldest', label: 'By Oldest' },
        ];

        const vlogState = this.state.prodactive;
        this.setState(
            {
                vlogactive: !vlogState,
                prodactive: false,
                blogactive: false,
                dashcontent: 'Vlogs',
                selectedSort: null,
                sortByOptions: options
            })
    }

    toggleProducts = () => {

        const options = [
            { value: 'name a to z', label: 'Name A to Z' },
            { value: 'name z to a', label: 'Name Z to A' },
            { value: 'by earliest ', label: 'By Earliest' },
            { value: 'by oldest', label: 'By Oldest' },
            { value: 'price max first', label: 'Price Max First' },
            { value: 'price min first', label: 'Price Min First' }
        ];

        const prodState = this.state.prodactive;
        this.setState(
            {
                prodactive: !prodState,
                vlogactive: false,
                blogactive: false,
                dashcontent: 'Products',
                selectedSort: null,
                sortByOptions: options
            })
    }

    toggleBlogs = () => {

        const options = [
            { value: 'name a to z', label: 'Name A to Z' },
            { value: 'name z to a', label: 'Name Z to A' },
            { value: 'by earliest', label: 'By Earliest' },
            { value: 'by oldest', label: 'By Oldest' },
        ];

        const blogState = this.state.blogactive;
        this.setState(
            {
                blogactive: !blogState,
                vlogactive: false,
                prodactive: false,
                dashcontent: 'Blogs',
                selectedSort: null,
                sortByOptions: options
            })
    }

    handleSelectedSort = (selectedSort) => {

        console.log(selectedSort)

        this.setState({ selectedSort: selectedSort })
        const prodtab = this.state.prodactive;
        const blogtab = this.state.blogactive;
        const vlogtab = this.state.vlogactive;

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
        let content = this.getContent(this.state.dashcontent);
        if (this.props.loading) {
            content = <Spinner />
        }

        return (
            <div className={classes.Main}>
                {/* <div className={classes.Blogs}>
                        <h1>Navigate to Blogs</h1>
                    </div> */}
                <div className={classes.ProductsPanel}>
                    <div className={classes.Filters}>
                        <div className={classes.Shifters}>
                            <h4 onClick={this.toggleVlogs} className={this.state.vlogactive ? classes.h4active : null} >Vlogs</h4>
                            <h4 onClick={this.toggleProducts} className={this.state.prodactive ? classes.h4active : null}>Products</h4>
                            <h4 onClick={this.toggleBlogs} className={this.state.blogactive ? classes.h4active : null}>Blogs</h4>
                        </div>
                        <div className={classes.Sorting}>
                            <h4>Sort By:</h4>
                            <Select
                                className={classes.Select}
                                value={this.state.selectedSort}
                                onChange={this.handleSelectedSort}
                                options={this.state.sortByOptions}
                            />
                        </div>
                    </div>
                    <div className={classes.Products}>
                        <div className={classes.ProductCard}>

                            {content}

                        </div>
                    </div>
                </div>
                {/* <div className={classes.Vlogs}>
                        <h1>Navigate to Vlogs</h1>
                    </div> */}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.DashboardProducts.products,
        vlogs: state.DashboardVlogs.Vlogs,
        blogs: state.DashboardBlogs.Blogs,
        loading: state.DashboardProducts.loading,
        error: state.DashboardProducts.error,
        token: state.Auth.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onfetchproducts: (token) => dispatch(actions.FetchDashProducts(token)),
        onfetchvlogs: (token) => dispatch(actions.FetchDashVlogs(token)),
        onfetchblogs: (token) => dispatch(actions.FetchDashBlogs(token)),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
