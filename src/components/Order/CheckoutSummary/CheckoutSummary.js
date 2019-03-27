import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';
import Auxilary from '../../../hoc/Auxilary/Auxilary';

const checkoutSummary = (props) => {
    return (
        <Auxilary>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>

            <div className={classes.CheckoutSummary} >
                <Button
                    btnType="Danger"
                    clicked={props.checkoutCancelled}>CANCEL</Button>
                <Button
                    btnType="Success"
                    clicked={props.checkoutContinued}>CONTINUE</Button>
            </div>
        </Auxilary>
    );
}

export default checkoutSummary;