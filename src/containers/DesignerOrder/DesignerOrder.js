import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import classes from './DesignerOrder.css';
import Spinner from '../../components/UI/Spinner/Spinner';
// import Button from '../../components/UI/Button/Button';
import DesignerOrderBody from '../../components/DesignerOrder/DesignerOrder';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/index';
class CustomerOrder extends Component {

    state = {
        cart: null
    }

    componentWillMount() {
        this.props.onfetchorders(this.props.token)
    }

    cancelOrderHandler = (orderid) => {
        console.log(orderid);
        // this.props.oncancelorder(this.props.token, orderid);
        // this.props.onfetchorders(this.props.token)

    }
    completeOrderHandler = (orderid) => {
        console.log(orderid);
    }
    render() {

        const orders = this.props.orders;
        let carddata = null;
        if (this.props.loading) {
            carddata = (
                <tr className={classes.TbTr}>
                    <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9].join(' ')}>
                        <Spinner />
                    </td>
                </tr>)
                ;
        } else if (this.props.orders) {
            if (this.props.orders.length > 0) {
                carddata = (orders.map((order, index) => (
                    <DesignerOrderBody
                        key={order._id}
                        index={index + 1}
                        products={order}
                        cpmpleted={order.status}
                        calcelled={order.status}
                        completeclicked={() => this.completeOrderHandler(order._id)}
                        cancelclicked={() => this.cancelOrderHandler(order._id)}
                    />
                )));
            } else {
                carddata = (
                    <tr className={classes.Empty}>
                        <td><h3>No Orders Placed By Any Customer Yet.</h3></td>
                    </tr>
                );
            }
        }

        return (
            <div className={classes.Main} >
                <div className={classes.Album}>
                    <h1>Customer Requested Orders</h1>
                    <div className={classes.Cart}>
                        <table className={classes.Table}>
                            <thead className={classes.Thead}>
                                <tr className={classes.TheadTrow}>
                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5].join(' ')}>Product Name</th>
                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5, classes.ThTrTh7].join(' ')}>Customer Name</th>
                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5, classes.ThTrTh7].join(' ')}>Address</th>
                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5, classes.ThTrTh8].join(' ')}>Phone No</th>
                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5, classes.ThTrTh8].join(' ')}>Price</th>
                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5, classes.ThTrTh7].join(' ')}>Payment Method</th>

                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5].join(' ')}>Action</th>
                                </tr>
                            </thead>
                            <tbody className={classes.Tbody}>
                                {carddata}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.Auth.token,
        orders: state.DesignerOrders.orders,
        loading: state.DesignerOrders.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onfetchorders: (token) => dispatch(actions.FetchDesignerOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrder);

