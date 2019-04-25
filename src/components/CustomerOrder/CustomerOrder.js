import React from 'react';
import classes from './CustomerOrder.css';
import { Link } from 'react-router-dom';
const CustomerOrder = (props) => {

    let products = props.products;
    // let productnames = [];
    // for (let i = 0; i < products.length; i++) {
    //     productnames[i] = products[i]
    // }
    console.log(products);

    return (
        <tr className={classes.TbTr}>
            <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9, classes.ThTrTh10].join(' ')} >
                <span>
                    <Link to="#order" className={classes.ThTrTh11}>{"Order No " + props.index}</Link>
                </span>
            </td>
            <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh1].join(' ')}>Red</td>
            <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh1].join(' ')}>{props.sizes}</td>
            <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13].join(' ')}>
                <span>
                    <small>Rs </small>
                    {props.price}
                </span>
            </td>
            <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13, classes.ThTrTh14].join(' ')}>

                <div className={classes.QuanButtons}>
                    <div className={classes.ibutton2}>
                        <i className="fas fa-plus"></i>
                    </div>
                </div>

            </td>
            <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13, classes.ThTrTh15].join(' ')}>
                <span>

                </span>
            </td>
            <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9].join(' ')}>
                <div className={classes.ibutton}>
                    <i className="fas fa-times-circle"></i>
                </div>
            </td>
        </tr>
    );
};

export default CustomerOrder;