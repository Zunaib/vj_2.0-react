import React from 'react';
import classes from './Cart.css';
import { Link } from 'react-router-dom';
const Cart = (props) => {

    let imgpath = 'http://localhost:5000' + props.images[0];

    return (
        <tr className={classes.TbTr}>
            <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9].join(' ')}>
                <div className={classes.AlbumImage} >
                    <img src={imgpath} alt="Cart_Product_Thumbnail" />
                </div>
            </td>
            <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9, classes.ThTrTh10].join(' ')} >
                <span>
                    <Link to="#product" className={classes.ThTrTh11}>{props.name}</Link>
                    <br />
                    <small>by Dolce&Gabbana</small>
                </span>
            </td>
            <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh1].join(' ')}>




            </td>

            <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh1].join(' ')}>{props.sizes}</td>
            <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13].join(' ')}>
                <span>
                    <small>Rs </small>
                    {props.price}
                </span>
            </td>
            <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13, classes.ThTrTh14].join(' ')}>

                <div className={classes.QuanButtons} onClick={props.add}>
                    <div className={classes.cross}>
                        <h4>Add</h4>
                        <i className="fas fa-plus"></i>
                    </div>

                </div>

            </td>
            <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9].join(' ')}>
                <div className={classes.QuanButtons}>
                    <div className={classes.cross}>
                        <h4>Remove</h4>
                        <i className="fas fa-times"></i>
                    </div>

                </div>

            </td>


        </tr>
    );
};

export default Cart;