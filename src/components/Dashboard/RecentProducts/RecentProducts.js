import React, { Component } from 'react';
import classes from './RecentProducts.css';
import ProductCard from '../../UI/Card/Product/ModifiedCard';

class RecentProducts extends Component {

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
                show={false}
            />

        )));

        return (
            < div className={classes.RecentProd} >
                <h2>Recent Products</h2>
                <hr></hr>
                {cards}
            </div >
        );
    }
};

export default RecentProducts;