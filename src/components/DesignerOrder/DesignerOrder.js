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
            <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9].join(' ')}>
                <div className={classes.ibutton} onClick={props.completeclicked}>
                    <h3>Completed</h3>
                    <i className="fas fa-info-circle"></i>
                </div>
                {false ?
                    <div className={classes.ibutton3}>
                        <h3>Cancelled</h3>
                        <i className="fas fa-times-circle"></i>
                    </div>
                    : <div className={classes.ibutton2} onClick={props.cancelclicked} >
                        <h3>Cancel</h3>
                        <i className="fas fa-times-circle"></i>
                    </div>}
            </td>
        </tr>
    );
};

export default CustomerOrder;