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

        if (this.props.token) {
            setTimeout(() => {
                this.props.onfetchorders(this.props.token)
            }, 50)

        }

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

            carddata = (orders.map((order, index) => (
                <DesignerOrderBody
                    key={order._id}
                    index={index + 1}
                    products={order}
                // name={cart.productId.productName}
                // price={cart.productId.price}
                // sizes={cart.productId.sizes}
                // quantity={cart.productId.quantity}
                // images={cart.productId.images}
                />

            )));
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
                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5, classes.ThTrTh7].join(' ')}>Discount</th>

                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5].join(' ')}>Cancel</th>
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

