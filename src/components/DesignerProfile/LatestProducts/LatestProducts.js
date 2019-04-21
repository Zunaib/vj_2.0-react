import React, { Component } from 'react';
import classes from './LatestProducts.css';
import { NavLink } from 'react-router-dom';
import ProductCard from '../../UI/Card/Product/ProductCard';

class LatestProducts extends Component {

    send = (product) => {
        console.log(product)
    }
    render() {
        const products = this.props.products;
        const cards = (products.map((product, index = product._id) => (
            <NavLink className={classes.Link} to={"/dashboard/products/" + product._id} key={product._id} onClick={() => this.send(product)}>
                <ProductCard
                    key={product._id}
                    name={product.productName}
                    price={product.price}
                    images={product.images}
                />
            </NavLink>

        )));

        return (
            <div className={classes.Work} >
                <div className={classes.Content}>
                    <h3>Latest Products</h3>
                    <div >
                        <i className="fas fa-plus"></i>
                    </div>
                    <div className={classes.Products}>
                        {cards}
                    </div>
                </div>
            </div>
        );
    }

};

export default LatestProducts;