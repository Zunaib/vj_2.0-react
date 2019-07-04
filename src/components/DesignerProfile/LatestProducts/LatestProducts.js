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
            <ProductCard
                key={product._id}
                name={product.productName}
                pid={product._id}
                likes={product.likes}
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
                    <NavLink to="/dashboard/handle_product/add_product" className={classes.Link}>
                        <div className={classes.AddAlbumButton}>
                            <h4>Add Product</h4>
                            <i className="fas fa-plus"></i>
                        </div>
                    </NavLink>
                    <div className={classes.Products}>
                        {cards}
                    </div>
                </div>
            </div>
        );
    }

};

export default LatestProducts;