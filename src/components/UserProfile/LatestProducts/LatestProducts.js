import React, { Component } from 'react';
import classes from './LatestProducts.css';
import ProductCard from '../../UI/Card/Product/ProductCard';

class LatestProducts extends Component {

    send = (product) => {
        console.log(product)
    }
    render() {
        const products = this.props.products;
        const cards = (products.map((product, index = product._id) => (
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

        console.log(cards)

        return (
            <div className={classes.Work} >
                <div className={classes.Content}>
                    <h3>Latest Products</h3>
                    <div className={classes.Products}>
                        {cards}
                    </div>
                </div>
            </div>
        );
    }

};

export default LatestProducts;