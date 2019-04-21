import React from 'react';
import classes from './ProductCard.css';
import test from '../../../../assets/images/testimg.jpg'
const ProductCard = (props) => {

    // let imgpath = 'http://localhost:5000' + props.images[0];
    return (
        <div className={classes.ProductCard}>
            <img src={test} alt="" />
            <div className={classes.CardText}>
                <h4><b>{props.name}</b></h4>
                <div className={classes.Desc}>
                    Dolce & Gabbana's 'Greta' tote has been crafted in Italy from hard-wearing red textured-leather.</div>
            </div>
            <div className={classes.CardInfo}>
                <div className={classes.CardPrice}>
                    <h4>Pkr {props.price}</h4>
                </div>
                <div className={classes.CardButton}>
                    Button
                </div>
            </div>
        </div>
    );
};

export default ProductCard;