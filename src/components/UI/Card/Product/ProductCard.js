import React, { useState } from 'react';
import classes from './ProductCard.css';
// import test from '../../../../assets/images/testimg.jpg'
const ProductCard = (props) => {


    const [hovered, setHovered] = useState(false);
    const toggleHover = () => setHovered(!hovered);

    let imgpath = 'http://localhost:5000' + props.images[0];
    return (
        <div className={classes.ProductCard}>
            <img src={imgpath} alt="" />
            <div className={classes.CardText}>
                <h4><b>{props.name}</b></h4>
            </div>
            <div className={classes.CardInfo}>
                <div className={classes.CardPrice}>
                    <h4>Pkr {props.price}</h4>
                </div>
                <div className={classes.CardButton}>
                    <i className={hovered ? "fas fa-heart" : "far fa-heart"} onMouseOver={toggleHover} onMouseOut={toggleHover}></i>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;