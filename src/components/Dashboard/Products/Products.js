import React, { Component } from 'react';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import ProductCard from '../../UI/Card/Product/ProductCard';

class Products extends Component {

    send = (product) => {
        console.log(product)
    }
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
            />

        )));

        return (
            < Auxilary >
                {cards}
            </Auxilary >
        );
    }
}

export default Products
