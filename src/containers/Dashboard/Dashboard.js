import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/index';
import classes from './Dashboard.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Products from '../../components/Dashboard/Products/Products';
import Vlogs from '../../components/Dashboard/Vlogs/Vlogs';
import Blogs from '../../components/Dashboard/Blogs/Blogs';


class Dashboard extends Component {
    state = {
        dashcontent: 'Products',
        prodactive: true,
        vlogactive: false,
        blogactive: false
    }


    componentDidMount = () => {
        this.props.onfetchproducts(this.props.token);
        this.props.onfetchvlogs(this.props.token);
        this.props.onfetchblogs(this.props.token);
    }


    getContent = (currentContent) => {
        const Content = {
            Products: <Products products={this.props.products} />,
            Blogs: <Blogs blogs={this.props.blogs} />,
            Vlogs: <Vlogs vlogs={this.props.vlogs} />
        };
        return Content[currentContent];
    }

    toggleVlogs = () => {
        const vlogState = this.state.prodactive;
        this.setState(
            {
                vlogactive: !vlogState,
                prodactive: false,
                blogactive: false,
                dashcontent: 'Vlogs'
            })
    }

    toggleProducts = () => {
        const prodState = this.state.prodactive;
        this.setState(
            {
                prodactive: !prodState,
                vlogactive: false,
                blogactive: false,
                dashcontent: 'Products'
            })
    }

    toggleBlogs = () => {
        const blogState = this.state.blogactive;
        this.setState(
            {
                blogactive: !blogState,
                vlogactive: false,
                prodactive: false,
                dashcontent: 'Blogs'
            })
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
