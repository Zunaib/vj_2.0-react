import React from 'react';
// import classes from './Products.css';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Card from '../../UI/Card/Card';

const Products = (props) => {
    const products = props.products;
    const cards = (products.map((product, index = product._id) => (
        <Card
            cardType="productCard"
            key={index}
            name={product.productName}
            price={product.price}
        />

    )));

    return (
        < Auxilary >
            {cards}
        </Auxilary >
    );
};

export default Products;
