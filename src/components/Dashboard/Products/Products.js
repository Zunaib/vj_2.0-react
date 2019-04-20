import React from 'react';
import { NavLink } from 'react-router-dom'
import classes from './Products.css';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Card from '../../UI/Card/Card';

const Products = (props) => {
    const products = props.products;
    const cards = (products.map((product, index = product._id) => (
        <NavLink className={classes.Link} to={"/dashboard/products/" + product._id} key={product._id}>
            <Card
                cardType="productCard"
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
};

export default Products;
