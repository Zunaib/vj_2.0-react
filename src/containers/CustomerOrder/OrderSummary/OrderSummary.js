import React, { Component } from 'react';
import classes from './OrderSummary.css';
export class OrderSummary extends Component {
    render() {

        let order = null;
        if (this.props.order) {

            console.log(this.props.order)

            order = (this.props.order.products.map((product) => {
                return <div key={product.product._id} className={classes.Main}>

                    <div className={classes.pName}>
                        <h4>{product.product.productName}</h4>
                    </div>
                    <div className={classes.pName}>
                        <h4>{product.product.userId.firstName + " " + product.product.userId.lastName}</h4>
                    </div>
                    <div className={classes.pName}>
                        <h4>{product.status}</h4>
                    </div>
                    <div className={classes.pName}>
                        <h4>{product.product.price}</h4>
                    </div>

                </div>
            })
            );
        }

        return (
            <div>
                <div className={classes.Header}>
                    <h3>Product Name</h3>
                    <h3>Product Designer</h3>
                    {/* <h3>Size</h3>
                    <h3>Color</h3> */}
                    <h3>Product Status</h3>
                    <h3>Product Price</h3>
                </div>
                {order}
            </div>
        )
    }
}

export default OrderSummary
