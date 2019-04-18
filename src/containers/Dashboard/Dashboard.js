import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/index';
import classes from './Dashboard.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Products from '../../components/Dashboard/Products/Products';
import Vlogs from '../../components/Dashboard/Vlogs/Vlogs';
import Blogs from '../../components/Dashboard/Blogs/Blogs';


class Dashboard extends Component {

    componentDidMount = () => {
        // console.log('token in dash' + this.props.token);
        if (this.props.token) {
            this.props.onfetchproducts(this.props.token);
        }
    }

    state = {
        dashcontent: 'Products'
    }

    getContent = (currentContent) => {
        const Content = {
            Products: <Products products={this.props.products} />,
            Blogs: <Blogs />,
            Vlogs: <Vlogs />
        };
        return Content[currentContent];
    }

    toggleVlogs = () => {
        this.setState({ dashcontent: 'Vlogs' })
    }

    toggleProducts = () => {
        this.setState({ dashcontent: 'Products' })
    }

    toggleBlogs = () => {
        this.setState({ dashcontent: 'Blogs' })
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
                            <h4 onClick={this.toggleVlogs}>Vlogs</h4>
                            <h4 onClick={this.toggleProducts}>Products</h4>
                            <h4 onClick={this.toggleBlogs}>Blogs</h4>
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
        products: state.Dashboard.products,
        loading: state.Dashboard.loading,
        error: state.Dashboard.error,
        token: state.Auth.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onfetchproducts: (token) => dispatch(actions.FetchDash(token))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
