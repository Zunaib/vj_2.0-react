import React from 'react';
import classes from './DesignerOrder.css';
import { Link } from 'react-router-dom';
const CustomerOrder = (props) => {

    let products = props.products;

    console.log(products);


    return (
        <tr className={classes.TbTr}>
            <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9, classes.ThTrTh10].join(' ')} >
                <span>
                    <Link to="#order" className={classes.ThTrTh11}>{products.product.productName}</Link>
                </span>
            </td>
            <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh1].join(' ')}>{products.billingDetails.firstName + " " + products.billingDetails.lastName}</td>
            <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13].join(' ')}>
                <span>
                    {products.billingDetails.streetAddress}
                </span>
            </td>
            <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh1].join(' ')}>{products.billingDetails.phone}</td>
            <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh1].join(' ')}>{products.price}</td>

            <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13, classes.ThTrTh15].join(' ')}>
                <span>
                    {products.paymentMethod}
                </span>
            </td>
            <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13, classes.ThTrTh15].join(' ')}>
                <span>
                    {products.discount}
                </span>
                <small>
                    %
                </small>
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