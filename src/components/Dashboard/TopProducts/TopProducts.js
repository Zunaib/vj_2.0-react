import React, { Component } from 'react';
import classes from './TopProducts.css';
import ProductCard from '../../UI/Card/Product/ModifiedCard';

class TopProducts extends Component {

    render() {
        const products = this.props.products;
        console.log(products)
        const cards = (products.map((product, index = product._id) => (
            <ProductCard
                key={product._id}
                pid={product._id}
                likes={product.likes}
                name={product.productName}
                price={product.price}
                images={product.images}
                desc={product.description}
                show={true}
            />

        )));

        return (
            < div className={classes.TopProd} >
                <h2>Top Products</h2>
                <hr></hr>
                {cards}
            </div >
        );
    }
};

export default TopProducts;