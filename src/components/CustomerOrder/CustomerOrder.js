import React from 'react';
import classes from './CustomerOrder.css';
import { Link } from 'react-router-dom';
const CustomerOrder = (props) => {

    let products = props.products;
    let orderdate = props.orderdate;
    // let productnames = [];
    // for (let i = 0; i < products.length; i++) {
    //     productnames[i] = products[i]
    // }
    let total = 0
    let productNames = []
    let designers = []
    for (let i = 0; i < products.length; i++) {
        console.log(products[i])
        total = products[i].price + total;
        productNames[i] = products[i].product.productName
        designers[i] = products[i].product.userId.firstName
    }
    console.log(productNames);

    return (
        <tr className={classes.TbTr}>
            <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9, classes.ThTrTh10].join(' ')} >
                <span>
                    <Link to="#order" className={classes.ThTrTh11}>{"Order No " + props.index}</Link>
                </span>
            </td>
            <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh1].join(' ')}>{orderdate.split("T")[0]}</td>
            <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13, classes.ThTrTh14].join(' ')}>

                <div className={classes.QuanButtons}>
                    <small>Rs </small>
                    {total}
                </div>

            </td>
            <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13, classes.ThTrTh15].join(' ')}>
                <span>

                </span>
            </td>
            <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9].join(' ')}>
                <div className={classes.ibutton}>
                    <h3>View Details</h3>
                    <i class="fas fa-info-circle"></i>
                </div>
                <div className={classes.ibutton2}>
                    <h3>Cancel</h3>
                    <i className="fas fa-times-circle"></i>
                </div>
            </td>
        </tr>
    );
};

export default CustomerOrder;