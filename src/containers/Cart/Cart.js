import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Cart.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import CartBody from '../../components/Cart/Cart';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/index';
class Cart extends Component {

    state = {
        cart: []
    }

    componentDidMount() {
        if (this.props.token) {
            this.props.onfetchcurrentcart(this.props.token)
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.cart !== prevState.cart) {
            return { cart: nextProps.cart };
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cart !== this.props.cart) {
            this.setState({ cart: this.props.cart });
        }
    }


    add(prod) {
        let prevcart =
            [
                ...this.state.cart
            ]
        prevcart.push(prod);
        console.log(prevcart)
        this.setState({ cart: prevcart }, () => {
            console.log(this.state)
        })
    }
    render() {

        let carddata = null;
        if (this.props.loading) {
            carddata = (
                <tr className={classes.TbTr}>
                    <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9].join(' ')}>
                        <Spinner />
                    </td>
                </tr>)
                ;
        } else if (this.props.cart) {
            const cart = this.state.cart;
            carddata = (cart.map((cart, index = cart._id) => (
                <CartBody
                    key={cart._id}
                    name={cart.productId.productName}
                    price={cart.productId.price}
                    sizes={cart.productId.sizes}
                    quantity={cart.productId.quantity}
                    images={cart.productId.images}
                    add={() => this.add(cart.productId)}
                />

            )));
        }

        let cartcontrols = null;

        if (this.props.cart) {
            if (this.props.cart.length > 0) {
                let total = null;
                for (let i = 0; i < this.props.cart.length; i++) {
                    total = total + this.props.cart[i].productId.price;
                }
                cartcontrols = (<tr className={[classes.TbTr, classes.ThTrTh20].join(' ')} >
                    <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9].join(' ')} colSpan={3}></td>
                    <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9, classes.ThTrTh21].join(' ')}>TOTAL</td>
                    <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9, classes.ThTrTh22].join(' ')}>
                        <span><small>Rs </small>{total}</span>

                    </td>
                    <td className={classes.ProceedButton}>
                    </td>
                    <td className={classes.ProceedButton}>
                        <NavLink to="/dashboard/checkout">
                            <Button btnType="WebButton" >Proceed To Checkout</Button>
                        </NavLink>
                    </td>
                </tr>)
            } else {
                console.log('empty')
                cartcontrols = (<tr className={[classes.TbTr, classes.ThTrTh20].join(' ')} >
                    <td> <h3>No Products Added To Cart </h3></td>

                </tr>)
            }
        }

        return (
            <div className={classes.Main} >
                <div className={classes.Album}>
                    <NavLink to='/dashboard'>
                        <div className={classes.cross}>
                            <h4>Close</h4>
                            <i className="fas fa-times"></i>
                        </div>
                    </NavLink>
                    <h1>Shopping Cart</h1>
                    <div className={classes.Cart}>

                        <table className={classes.Table}>
                            <thead className={classes.Thead}>
                                <tr className={classes.TheadTrow}>
                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh4, classes.ThTrTh5].join(' ')}></th>
                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5].join(' ')}>Product</th>
                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5, classes.ThTrTh7].join(' ')}>Color</th>
                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5, classes.ThTrTh7].join(' ')}>Size</th>
                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5, classes.ThTrTh8].join(' ')}>Price</th>
                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5, classes.ThTrTh8].join(' ')}>Quantity</th>
                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5].join(' ')}>Action</th>
                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5, classes.ThTrTh8].join(' ')}></th>
                                </tr>
                            </thead>
                            <tbody className={classes.Tbody}>
                                {carddata}
                                {cartcontrols}
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
        cart: state.Cart.cart,
        loading: state.Cart.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onfetchcurrentcart: (token) => dispatch(actions.FetchCart(token)),
        onupdatecart: (token, cart) => dispatch(actions.UpdateCart(token, cart))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

