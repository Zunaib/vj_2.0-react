import React from 'react';
import classes from './CustomerOrder.css';
import { Link } from 'react-router-dom';
const CustomerOrder = (props) => {

    let products = props.products;
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
            <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh1].join(' ')}>{productNames.join('  ,  ')}</td>
            <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh1].join(' ')}>{designers.join('  ,  ')}</td>
            <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13].join(' ')}>
                <span>
                    {products.status}
                </span>
            </td>
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
                    <i className="fas fa-times-circle"></i>
                </div>
            </td>
        </tr>
    );
};

export default CustomerOrder;