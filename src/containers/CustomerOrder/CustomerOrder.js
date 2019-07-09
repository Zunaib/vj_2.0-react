import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import classes from './CustomerOrder.css';
import Spinner from '../../components/UI/Spinner/Spinner';
// import Button from '../../components/UI/Button/Button';
import CustomerOrderBody from '../../components/CustomerOrder/CustomerOrder';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/index';

import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../containers/CustomerOrder/OrderSummary/OrderSummary';
import Auxilary from '../../hoc/Auxilary/Auxilary';

class CustomerOrder extends Component {

    state = {
        cart: null,
        orderopened: false,
        order: null
    }

    componentDidMount() {

        if (this.props.token) {
            setTimeout(() => {
                this.props.onfetchorders(this.props.token)
            }, 50)

        }

    }

    cancelOrderHandler = (orderid) => {
        this.props.oncancelorder(this.props.token, orderid);
    }
    viewOrderHandler = (order) => {
        this.setState({ orderopened: true, order: order })
    }
    hideOrderHandler = () => {
        this.setState({ orderopened: false, order: null })
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
                if (this.props.orders) {
                    carddata = (orders.map((order, index) => (
                        <CustomerOrderBody
                            key={order._id}
                            index={index + 1}
                            products={order.products}
                            orderdate={order.createdAt}
                            viewclicked={() => this.viewOrderHandler(order)}
                            cancelclicked={() => this.cancelOrderHandler(order._id)}
                        />

                    )));
                }
            } else {
                carddata = (
                    <tr className={classes.Empty}>
                        <td><h3>No Orders Placed By You Yet.</h3></td>
                    </tr>
                );
            }
        }

        return (
            <Auxilary>
                <Modal show={this.state.orderopened} modalClosed={this.hideOrderHandler}>
                    <OrderSummary order={this.state.order} />
                </Modal>
                <div className={classes.Main} >
                    <div className={classes.Album}>
                        <h1>My Placed Orders</h1>
                        <div className={classes.Cart}>
                            <table className={classes.Table}>
                                <thead className={classes.Thead}>
                                    <tr className={classes.TheadTrow}>
                                        <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5].join(' ')}>Order Number</th>
                                        <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5, classes.ThTrTh7].join(' ')}>Order Date</th>
                                        <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5, classes.ThTrTh8].join(' ')}>Total</th>
                                        <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5, classes.ThTrTh8].join(' ')}></th>
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
            </Auxilary>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.Auth.token,
        orders: state.CustomerOrders.orders,
        loading: state.CustomerOrders.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onfetchorders: (token) => dispatch(actions.FetchOrders(token)),
        oncancelorder: (token, orderid) => dispatch(actions.CencelOrder(token, orderid)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrder);

