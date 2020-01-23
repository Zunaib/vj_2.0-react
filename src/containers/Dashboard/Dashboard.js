import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/index';
import classes from './Dashboard.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Products from '../../components/Dashboard/Products/Products';
import Vlogs from '../../components/Dashboard/Vlogs/Vlogs';
import Blogs from '../../components/Dashboard/Blogs/Blogs';
import RecentProducts from '../../components/Dashboard/RecentProducts/RecentProducts'
import TopProducts from '../../components/Dashboard/TopProducts/TopProducts'
import RecentVlogs from '../../components/Dashboard/RecentVlogs/RecentVlogs'
import TopVlogs from '../../components/Dashboard/TopVlogs/TopVlogs'
import TopBlogs from '../../components/Dashboard/TopBlogs/TopBlogs'
import RecentBlogs from '../../components/Dashboard/RecentBlogs/RecentBlogs'

import Auxilary from '../../hoc/Auxilary/Auxilary';
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
        { value: 'price min first', label: 'Price Min First' }],
        RecentProducts: [],
        TopProducts: [],
        RecentVlogs: [],
        TopVlogs: [],
        RecentBlogs: [],
        TopBlogs: [],
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
            this.setProducts()
        }
        if (prevProps.vlogs !== this.props.vlogs) {
            //Perform some operation here
            this.setState({ vlogs: this.props.vlogs });
            this.setVlogs()
        }
        if (prevProps.blogs !== this.props.blogs) {
            //Perform some operation here
            this.setState({ blogs: this.props.blogs });
            this.setBlogs()
        }
    }

    setProducts = () => {
        let products = this.state.products;
        if (products) {
            let arr = products.sort(function (a, b) {
                var keyA = new Date(a.createdAt),
                    keyB = new Date(b.createdAt);
                // Compare the 2 dates
                if (keyA > keyB) return -1;
                if (keyA < keyB) return 1;
                return 0;
            });

            arr = arr.slice(0, 5)

            this.setState({ RecentProducts: arr })

            let arr1 = products.sort(function (a, b) {
                if (a.likes.length > b.likes.length) { return -1; }
                if (a.likes.length < b.likes.length) { return 1; }
                return 0;
            })

            arr1 = arr1.slice(0, 5)


            this.setState({ TopProducts: arr1 })

        }
    }

    setVlogs = () => {
        let vlogs = this.state.vlogs;
        if (vlogs) {
            let arr = vlogs.sort(function (a, b) {
                var keyA = new Date(a.createdAt),
                    keyB = new Date(b.createdAt);
                // Compare the 2 dates
                if (keyA > keyB) return -1;
                if (keyA < keyB) return 1;
                return 0;
            });

            arr = arr.slice(0, 5)

            this.setState({ RecentVlogs: arr })

            let arr1 = vlogs.sort(function (a, b) {
                if (a.likes.length > b.likes.length) { return -1; }
                if (a.likes.length < b.likes.length) { return 1; }
                return 0;
            })


            arr1 = arr1.slice(0, 5)


            this.setState({ TopVlogs: arr1 })

        }
    }
    setBlogs = () => {
        let blogs = this.state.blogs;
        if (blogs) {
            let arr = blogs.sort(function (a, b) {
                var keyA = new Date(a.createdAt),
                    keyB = new Date(b.createdAt);
                // Compare the 2 dates
                if (keyA > keyB) return -1;
                if (keyA < keyB) return 1;
                return 0;
            });

            arr = arr.slice(0, 5)

            this.setState({ RecentBlogs: arr })

            let arr1 = blogs.sort(function (a, b) {
                if (a.likes.length > b.likes.length) { return -1; }
                if (a.likes.length < b.likes.length) { return 1; }
                return 0;
            })

            arr1 = arr1.slice(0, 5)


            this.setState({ TopBlogs: arr1 })

        }
    }

    getContent = (currentContent) => {
        const Content = {
            Products: <Products products={this.state.products} />,
            Blogs: <Blogs blogs={this.state.blogs} />,
            Vlogs: <Vlogs vlogs={this.state.vlogs} />
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

        this.setState(
            {
                vlogactive: true,
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

        this.setState(
            {
                prodactive: true,
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

        this.setState(
            {
                blogactive: true,
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
                let arr = products.sort(function (a, b) {
                    var keyA = new Date(a.createdAt),
                        keyB = new Date(b.createdAt);
                    // Compare the 2 dates
                    if (keyA > keyB) return -1;
                    if (keyA < keyB) return 1;
                    return 0;
                });
                this.setState({ products: arr })
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

        let head = null;
        let classified = null;
        if (this.state.prodactive) {
            head = "All Products";
            if (this.state.RecentProducts && this.state.TopProducts) {
                classified = (
                    <Auxilary>
                        <RecentProducts products={this.state.RecentProducts} />
                        <TopProducts products={this.state.TopProducts} />
                    </Auxilary>
                )
            }
        } else if (this.state.vlogactive) {
            head = "All Vlogs";
            if (this.state.TopVlogs && this.state.RecentVlogs) {
                classified = (
                    <Auxilary>
                        <RecentVlogs vlogs={this.state.RecentVlogs} />
                        <TopVlogs vlogs={this.state.TopVlogs} />
                    </Auxilary>
                )
            }
        } else if (this.state.blogactive) {
            head = "All Blogs";
            classified = (
                <Auxilary>
                    <RecentBlogs blogs={this.state.RecentBlogs} />
                    <TopBlogs blogs={this.state.TopBlogs} />
                </Auxilary>
            )
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

                    </div>
                    <div className={classes.Products}>
                        <div className={classes.ProductCard}>
                            {classified}
                            <div className={classes.All}>
                                <h2>{head}</h2>
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
                            <hr></hr>
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
