import React from 'react';
import classes from './CustomerOrder.css';
import { Link } from 'react-router-dom';
const CustomerOrder = (props) => {

    let products = props.products;
    let orderdate = props.orderdate;

    let total = 0
    let productNames = []
    let designers = []
    if (products) {
        for (let i = 0; i < products.length; i++) {
            total = products[i].price + total;
            productNames[i] = products[i].product.productName
            designers[i] = products[i].product.userId.firstName;
        }
        console.log(products)
    }

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
                <div className={classes.ibutton} onClick={props.viewclicked}>
                    <h3>View Details</h3>
                    <i className="fas fa-info-circle"></i>
                </div>
                {products[0].status === "Cancelled" ?
                    <div className={classes.ibutton3}>
                        <h3>Cancelled</h3>
                        <i className="fas fa-times-circle"></i>
                    </div>
                    :
                    products[0].status === "Completed" ?
                        <div className={classes.ibutton3}>
                            <h3>Completed</h3>
                            <i className="far fa-check-square"></i>
                        </div>
                        :
                        <div className={classes.ibutton2} onClick={props.cancelclicked} >
                            <h3>Cancel</h3>
                            <i className="fas fa-times-circle"></i>
                        </div>}
            </td>
        </tr>
    );
};

export default CustomerOrder;