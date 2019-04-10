import React from 'react';
// import classes from './Products.css';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Card from '../../UI/Card/Card';

const Products = (props) => {

    return (
        < Auxilary >
            {
                props.products.map(product => (
                    <Card
                        cardType="productCard"
                        key={product._id}
                        name={product.productName}
                        desc={product.description}
                        image={product.images}
                        price={product.price} />
                ))
            }
        </Auxilary >
    );
};

export default Products;
