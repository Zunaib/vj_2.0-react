import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import classes from './Products.css';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import ProductCard from '../../UI/Card/Product/ProductCard';

class Products extends Component {

    send = (product) => {
        console.log(product)
    }
    render() {
        const products = this.props.products;
        const cards = (products.map((product, index = product._id) => (
            <NavLink className={classes.Link} to={"/dashboard/products/" + product._id} key={index}>
                <ProductCard
                    key={product._id}
                    name={product.productName}
                    price={product.price}
                    images={product.images}
                />
            </NavLink>

        )));

        return (
            < Auxilary >
                {cards}
            </Auxilary >
        );
    }
}

export default Products
