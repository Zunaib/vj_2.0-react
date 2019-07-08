import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/index';
import classes from './FavProducts.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Products from '../../components/Dashboard/Products/Products';


class FavProducts extends Component {



    componentDidMount = () => {
        this.props.onfetchproducts(this.props.token);
    }


    render() {
        let content = <Products products={this.props.products} />;
        if (this.props.loading) {
            content = <Spinner />
        }

        return (
            <div className={classes.Main}>
                {/* <div className={classes.Blogs}>
                        <h1>Navigate to Blogs</h1>
                    </div> */}
                <div className={classes.ProductsPanel}>
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
        products: state.FavProducts.products,
        loading: state.FavProducts.loading,
        error: state.FavProducts.error,
        token: state.Auth.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onfetchproducts: (token) => dispatch(actions.FetchFavProducts(token)),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(FavProducts);
