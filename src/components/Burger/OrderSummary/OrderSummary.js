import React from 'react';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (<li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
            );
        });
    return (
        <Auxilary>
            <h3>Your Order</h3>
            <p>Your Burger With Following Ingredients : </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : {props.price.toFixed(2)}</strong></p>
            <p>Continue To Checkout</p>
            <Button
                clicked={props.puchaseCancelled}
                btnType="Danger"
            >Cancel</Button>

            <Button
                clicked={props.purchaseContinued}
                btnType="Success"
            >Continue</Button>
        </Auxilary>
    );
}

export default OrderSummary;